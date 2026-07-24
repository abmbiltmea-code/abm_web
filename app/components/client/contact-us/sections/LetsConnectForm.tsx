"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/app/components/client/forms/FormInput";
import FormTextArea from "@/app/components/client/forms/FormTextArea";
import {
  letsConnectFormSchema,
  LetsConnectFormValues,
} from "@/lib/validations/LetsConnectForm";
import CustomButton from "../../common/CustomButton";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "sonner";
import { sendContactEnquiryAction } from "@/lib/mail/actions/sendContactEnquiryAction";

export default function LetsConnectForm() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LetsConnectFormValues>({
    resolver: zodResolver(letsConnectFormSchema),
    defaultValues: {
      firstName: "",
      secondName: "",
      email: "",
      contactNo: "",
      message: "",
    },
  });

  const onSubmit = async (data: LetsConnectFormValues) => {
    if (!recaptchaRef.current?.getValue()) {
      toast.error("Please complete the captcha verification");
      return;
    }
    setIsSubmitting(true);
    try {
      await sendContactEnquiryAction(data);
      toast.success("Enquiry sent successfully!");
      reset();
      recaptchaRef.current?.reset();
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
      <div className="flex flex-col gap-[30px] lg:gap-40">
        <div className="grid sm:grid-cols-2 gap-y-[30px] lg:gap-x-80 3xl:gap-x-[88px]">
          <FormInput
            label="First Name"
            required
            error={errors.firstName?.message}
            {...register("firstName")}
          />
          <FormInput
            label="Second Name"
            required
            error={errors.secondName?.message}
            {...register("secondName")}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-y-[30px] lg:gap-x-80 3xl:gap-x-[88px]">
          <FormInput
            label="Email"
            type="email"
            required
            error={errors.email?.message}
            {...register("email")}
          />
          <FormInput
            label="Contact no"
            type="tel"
            required
            error={errors.contactNo?.message}
            {...register("contactNo")}
          />
        </div>

        <FormTextArea
          label="Message"
          required
          error={errors.message?.message}
          {...register("message")}
        />
      </div>

      <div className="mt-20">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
        />
      </div>

      {/* Submit */}
      <div className="mt-20">
        <CustomButton
          type="submit"
          text={isSubmitting ? "Submitting..." : "Submit"}
        />
      </div>
    </form>
  );
}
