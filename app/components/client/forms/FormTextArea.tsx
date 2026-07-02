"use client";

import { forwardRef } from "react";

interface FormTextAreaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "name"
> {
  label: string;
  name: string;
  required?: boolean;
  rows?: number;
  error?: string;
}

const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  ({ label, name, required = false, rows = 2, error, ...rest }, ref) => {
    return (
      <label htmlFor={name} className="relative w-full pb-5 block cursor-text">
        <span className="text-description text-description-color">
          {label}
          {required && (
            <span className="ml-[-0.5px] text-description text-description-color">
              ﹡
            </span>
          )}
        </span>

        <textarea
          id={name}
          name={name}
          required={required}
          rows={rows}
          ref={ref}
          {...rest}
          className="peer mt-[54px] w-full bg-transparent text-description font-poppins text-description-color outline-none resize-none placeholder:text-secondary block p-0 leading-3 overflow-hidden"
        />

        {/* Base line */}
        <span className="absolute left-0 bottom-5 w-full h-px bg-description-color/30" />
        {/* Animated fill line */}
        <span
          className={`absolute left-0 bottom-5 h-px transition-all duration-500 ease-in-out
            ${error ? "w-full bg-red-500" : "w-0 bg-secondary peer-focus-within:w-full"}`}
        />

        {/* Error */}
        <span className="absolute left-0 bottom-0 h-5 text-15 text-red-500">
          {error ?? ""}
        </span>
      </label>
    );
  },
);

FormTextArea.displayName = "FormTextArea";

export default FormTextArea;
