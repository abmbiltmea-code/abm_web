"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import FormInput from "@/app/components/client/forms/FormInput";
import FormTextArea from "@/app/components/client/forms/FormTextArea";
import {
  careerApplicationFormSchema,
  CareerApplicationFormValues,
} from "@/app/lib/validations/careerApplicationForm";
import FormFileInput from "../../forms/FormFileInput";
import CustomButton from "../../common/CustomButton";
import Image from "next/image";

export default function CareerApplicationForm({
  isOpen,
  onClose,
  title,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CareerApplicationFormValues>({
    resolver: zodResolver(careerApplicationFormSchema),
    defaultValues: {
      firstName: "",
      secondName: "",
      phoneNumber: "",
      email: "",
      currentLocation: "",
      message: "",
    },
  });

  const cvFileList = watch("cv");
  const cvFileName = cvFileList?.[0]?.name;

  const onSubmit = async (data: CareerApplicationFormValues) => {
    console.log(data);
    reset();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-9999 bg-black/80 flex items-start sm:items-center justify-center overflow-y-auto py-70"
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="container !p-0 bg-white rounded-[10px] w-full min-[1900px]:!max-w-[1720px]"
          >
            <div className="p-40">
              <div className="flex items-center justify-between pb-20 mb-40 border-b border-border-color">
                <h2 className="text-secondary text-subtitle-2 uppercase">
                  {title}
                </h2>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => {
                    onClose();
                    reset();
                  }}
                  className="box-size rounded-[5px] flex items-center justify-center border border-border-color hover:border-primary transition-colors duration-500 cursor-pointer"
                >
                  <Image
                    src={"/assets/icons/close.svg"}
                    alt="Close"
                    width={23}
                    height={23}
                    className="h-4 xl:h-5 2xl:h-[23px] w-auto"
                  />
                </button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="flex flex-col gap-40">
                  <div className="grid sm:grid-cols-2 gap-40 3xl:gap-x-[43px]">
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
                  <div className="grid sm:grid-cols-2 gap-40 3xl:gap-x-[43px]">
                    <FormInput
                      label="Phone Number"
                      type="tel"
                      required
                      error={errors.phoneNumber?.message}
                      {...register("phoneNumber")}
                    />
                    <FormInput
                      label="Email Address"
                      type="email"
                      required
                      error={errors.email?.message}
                      {...register("email")}
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-40 3xl:gap-x-[43px]">
                    <FormInput
                      label="Your Current Location"
                      required
                      error={errors.currentLocation?.message}
                      {...register("currentLocation")}
                    />
                    <FormFileInput
                      label="Upload CV* (PDF/DOC)"
                      required
                      error={errors.cv?.message as string}
                      accept=".pdf,.doc,.docx"
                      fileName={cvFileName}
                      {...register("cv")}
                    />
                  </div>
                  <FormTextArea
                    label="Message"
                    error={errors.message?.message}
                    {...register("message")}
                  />
                </div>
                <div className="mt-5">
                  <CustomButton
                    text={isSubmitting ? "Submitting..." : "Submit Application"}
                    disabled={isSubmitting}
                    type="submit"
                  />
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
