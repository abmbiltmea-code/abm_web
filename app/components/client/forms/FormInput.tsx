"use client";

import { forwardRef } from "react";

interface FormInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "name"
> {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, name, type = "text", required = false, error, ...rest }, ref) => {
    return (
      <label
        htmlFor={name}
        className="relative w-full pb-[calc(40px+20px)] block cursor-text"
      >
        <span className="text-description text-description-color">
          {label}
          {required && (
            <span className="ml-[-0.5px] text-description text-description-color">
              ﹡
            </span>
          )}
        </span>
        <input
          id={name}
          type={type}
          name={name}
          required={required}
          ref={ref}
          {...rest}
          className="peer absolute left-0 bottom-5 w-full bg-transparent text-description text-description-color outline-none placeholder:text-secondary"
        />
        {/* base line */}
        <span className="absolute left-0 bottom-5 w-full h-px bg-description-color/30" />
        {/* animated fill line */}
        <span
          className={`absolute left-0 bottom-5 h-px transition-all duration-500 ease-in-out
            ${error ? "w-full bg-red-500" : "w-0 bg-secondary peer-focus:w-full"}`}
        />
        <span className="absolute left-0 bottom-0 h-5 text-15 text-red-500">
          {error ?? ""}
        </span>
      </label>
    );
  },
);

FormInput.displayName = "FormInput";

export default FormInput;
