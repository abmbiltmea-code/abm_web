"use client";

import { useState } from "react";
import FormInput from "@/app/components/client/forms/FormInput";
import FormSelect from "@/app/components/client/forms/FormSelect";
import FormTextArea from "@/app/components/client/forms/FormTextArea";
import CustomButton from "@/app/components/client/common/CustomButton";

const subjectOptions = [
  { label: "General Inquiry", value: "general" },
  { label: "Project Consultation", value: "consultation" },
  { label: "Request a Quote", value: "quote" },
  { label: "Partnership", value: "partnership" },
  { label: "Other", value: "other" },
];

interface FormState {
  name: string;
  firstName: string;
  organization: string;
  country: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    firstName: "",
    organization: "",
    country: "",
    subject: "",
    message: "",
  });

  const handleInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formState);
  };

  return (
    <div className="bg-white rounded-[10px] p-40 w-[48%] 3xl:w-full max-w-[799px] 3xl:h-[760px]">
      <h2 className="text-subtitle uppercase text-secondary mb-30">
        Send an Inquiry
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-40">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-x-40 3xl:gap-x-[65.77px]">
            <FormInput
              label="Name"
              name="name"
              required
              value={formState.name}
              onChange={handleInput}
            />
            <FormInput
              label="First Name"
              name="firstName"
              required
              value={formState.firstName}
              onChange={handleInput}
            />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-x-40 3xl:gap-x-[65.77px]">
            <FormInput
              label="Your Organization"
              name="organization"
              required
              value={formState.organization}
              onChange={handleInput}
            />
            <FormInput
              label="Country"
              name="country"
              required
              value={formState.country}
              onChange={handleInput}
            />
          </div>

          {/* Subject */}
          <FormSelect
            label="Subject"
            name="subject"
            required
            value={formState.subject}
            options={subjectOptions}
            onChange={(value) =>
              handleInput({
                target: { name: "subject", value },
              } as React.ChangeEvent<HTMLInputElement>)
            }
          />

          {/* Message */}
          <FormTextArea
            label="Message"
            name="message"
            required
            value={formState.message}
            onChange={handleInput}
          />
        </div>
        {/* Submit */}
        <div className="mt-20">
          <CustomButton text="Submit Inquiry" href="#" />
        </div>
      </form>
    </div>
  );
}
