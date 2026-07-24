"use server";

import { sendMail } from "../sendMail";
import {
  HomeEnquiryEmail,
  HomeEnquiryEmailProps,
} from "../templates/homeEnquiry";
import {
  homeEnquiryFormSchema,
  HomeEnquiryFormValues,
} from "@/lib/validations/homeEnquiryForm";
import HomeEnquiry from "@/app/models/HomeEnquiry";
import { getToEmail } from "@/lib/services/getToMail.service";
import connectDB from "@/lib/mongodb";

export async function sendHomeEnquiryAction(data: HomeEnquiryFormValues) {
  try {
    const parsed = homeEnquiryFormSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.issues[0]?.message || "Invalid form data",
      };
    }

    const validData = parsed.data;

    await connectDB();
    await HomeEnquiry.create(validData);

    const toEmail = await getToEmail("contact");
    await sendMail<HomeEnquiryEmailProps>({
      to: toEmail,
      subject: `New Enquiry from ${validData.firstName} ${validData.lastName}`,
      template: HomeEnquiryEmail,
      props: validData,
    });

    return {
      success: true,
      message: "Message sent successfully",
    };
  } catch (error: any) {
    console.error("Home Enquiry Action Error:", error);

    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
}
