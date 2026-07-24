"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/app/components/client/forms/FormInput";
import FormSelect from "@/app/components/client/forms/FormSelect";
import FormTextArea from "@/app/components/client/forms/FormTextArea";
import CustomButton from "@/app/components/client/common/CustomButton";
import {
  homeEnquiryFormSchema,
  HomeEnquiryFormValues,
} from "@/lib/validations/homeEnquiryForm";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { sendHomeEnquiryAction } from "@/lib/mail/actions/sendHomeEnquiryAction";

const subjectOptions = [
  { label: "General Inquiry", value: "general" },
  { label: "Project Consultation", value: "consultation" },
  { label: "Request a Quote", value: "quote" },
  { label: "Partnership", value: "partnership" },
  { label: "Other", value: "other" },
];

export default function ContactForm() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<HomeEnquiryFormValues>({
    resolver: zodResolver(homeEnquiryFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      company: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: HomeEnquiryFormValues) => {
    if (!recaptchaRef.current?.getValue()) {
      toast.error("Please complete the captcha verification");
      return;
    }
    setIsSubmitting(true);
    try {
      await sendHomeEnquiryAction(data);
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
    <div className="bg-white rounded-[10px] lg:p-[25px] xl:p-40 w-full lg:w-[70%] 3xl:w-full max-w-[799px]">
      <h2 className="text-subtitle uppercase text-secondary mb-40 lg:mb-30">
        Send an Inquiry
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col gap-[25px] lg:gap-[25px] xl:gap-40">
          {/* Row 1 */}
          <div className="grid sm:grid-cols-2 gap-[25px] lg:gap-x-40 3xl:gap-x-[65.77px]">
            <FormInput
              label="First Name"
              required
              error={errors.firstName?.message}
              {...register("firstName")}
            />
            <FormInput
              label="Last Name"
              required
              error={errors.lastName?.message}
              {...register("lastName")}
            />
          </div>

          {/* Row 2 */}
          <div className="grid sm:grid-cols-2 gap-[25px] lg:gap-x-40 3xl:gap-x-[65.77px]">
            <FormInput
              label="Company Name"
              required
              error={errors.company?.message}
              {...register("company")}
            />
            <FormInput
              label="Email"
              required
              error={errors.email?.message}
              {...register("email")}
            />
          </div>

          {/* Subject */}
          <Controller
            name="subject"
            control={control}
            render={({ field }) => (
              <FormSelect
                label="Subject"
                name="subject"
                required
                value={field.value}
                onChange={field.onChange}
                options={subjectOptions}
                error={errors.subject?.message}
              />
            )}
          />

          {/* Message */}
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
            text={isSubmitting ? "Submitting..." : "Submit Inquiry"}
          />
        </div>
      </form>
    </div>
  );
}
