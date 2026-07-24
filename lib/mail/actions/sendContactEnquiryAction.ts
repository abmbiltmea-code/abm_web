"use server";

import { sendMail } from "../sendMail";
import {
  ContactEnquiryEmail,
  ContactEnquiryEmailProps,
} from "../templates/contactEnquiry";
import {
  letsConnectFormSchema,
  LetsConnectFormValues,
} from "../../validations/LetsConnectForm";
import ContactEnquiry from "@/app/models/ContactEnquiry";
import { getToEmail } from "../../services/getToMail.service";
import connectDB from "../../mongodb";

export async function sendContactEnquiryAction(data: LetsConnectFormValues) {
  try {
    const parsed = letsConnectFormSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.issues[0]?.message || "Invalid form data",
      };
    }

    const validData = parsed.data;

    await connectDB();
    await ContactEnquiry.create(validData);

    const toEmail = await getToEmail("contact");
    await sendMail<ContactEnquiryEmailProps>({
      to: toEmail,
      subject: `New Contact Enquiry from ${validData.firstName} ${validData.secondName}`,
      template: ContactEnquiryEmail,
      props: validData,
    });

    return {
      success: true,
      message: "Message sent successfully",
    };
  } catch (error: any) {
    console.error("Contact Enquiry Action Error:", error);

    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
}