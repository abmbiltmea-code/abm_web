"use server";

import { sendMail } from "../sendMail";
import {
  CareerEnquiryEmail,
  CareerEnquiryEmailProps,
} from "../templates/careerEnquiry";
import CareerEnquiry from "@/app/models/CareerEnquiry";
import connectDB from "../../mongodb";
import { getToEmail } from "@/lib/services/getToMail.service";
import { uploadToDropbox } from "@/lib/connectDropbox";

export async function sendCareerApplicationAction(formData: FormData) {
  try {
    const firstName = formData.get("firstName") as string;
    const secondName = formData.get("secondName") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const email = formData.get("email") as string;
    const currentLocation = formData.get("currentLocation") as string;
    const message = (formData.get("message") as string) || "";
    const cv = formData.get("cv") as File | null;

    if (!firstName || !secondName || !email || !phoneNumber || !currentLocation || !cv) {
      return { success: false, message: "Missing required fields" };
    }


    const filename = `${Date.now()}-${cv.name}`;
    const cvUrl = await uploadToDropbox(cv, `/cv/${filename}`);

    // Build email attachment (base64) alongside the Dropbox upload
    const bytes = await cv.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const attachment = {
      filename: cv.name,
      content: buffer.toString("base64"),
      contentType: cv.type,
    };

    await connectDB();
    await CareerEnquiry.create({
      firstName,
      secondName,
      phoneNumber,
      email,
      currentLocation,
      message,
      cvUrl,
      cvFileName: cv.name,
    });

    const props: CareerEnquiryEmailProps = {
      firstName,
      secondName,
      phoneNumber,
      email,
      currentLocation,
      message,
    };

    const toEmail = await getToEmail("career");
    await sendMail<CareerEnquiryEmailProps>({
      to: toEmail,
      subject: `New Application from ${firstName} ${secondName}`,
      template: CareerEnquiryEmail,
      props,
      attachments: [attachment],
    });

    return { success: true, message: "Application sent successfully" };
  } catch (error: any) {
    console.error("Career Application Action Error:", error);
    return { success: false, message: error.message || "Something went wrong" };
  }
}