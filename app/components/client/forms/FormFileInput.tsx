"use client";

import { forwardRef, useId, useState } from "react";

interface FormFileInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "name"
> {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  fileName?: string;
}

const FormFileInput = forwardRef<HTMLInputElement, FormFileInputProps>(
  ({ label, name, required = false, error, fileName, onFocus, ...rest }, ref) => {
    const autoId = useId();
    const inputId = name || autoId;
    const [touched, setTouched] = useState(false);

    const floated = touched || !!fileName;

    return (
      <div className="relative w-full pb-[calc(25px+20px)] md:pb-[calc(40px+20px)]">
        <input
          id={inputId}
          type="file"
          name={name}
          required={required}
          ref={ref}
          onFocus={(e) => {
            setTouched(true);
            onFocus?.(e);
          }}
          {...rest}
          className="peer absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <span className="absolute left-0 bottom-5 w-full truncate pr-20 text-description text-description-color">
          {fileName ?? ""}
        </span>

        <label
          htmlFor={inputId}
          className={`
            absolute left-0 bottom-8 origin-left
            transition-transform duration-500 ease-in-out
            pointer-events-none text-description-color select-none
            text-description
            ${
              floated
                ? "!scale-[0.79] !-translate-y-[10px] md:!-translate-y-[15px]"
                : "scale-100 translate-y-0"
            }
          `}
        >
          {label}
          {required && (
            <span className="ml-[-0.5px] text-description-color">﹡</span>
          )}
        </label>

        <span className="absolute left-0 bottom-5 w-full h-px bg-description-color/30" />
        <span
          className={`absolute left-0 bottom-5 h-px transition-all duration-500 ease-in-out
            ${error ? "w-full bg-red-500" : "w-0 bg-secondary peer-focus:w-full"}`}
        />
        <span className="absolute left-0 bottom-0 h-5 text-15 text-red-500">
          {error ?? ""}
        </span>
      </div>
    );
  },
);

FormFileInput.displayName = "FormFileInput";

export default FormFileInput;