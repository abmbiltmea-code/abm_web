"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface CustomButtonBaseProps {
  text: string;
  className?: string;
  onClick?: () => void;
}

interface CustomButtonAsLink extends CustomButtonBaseProps {
  href?: string;
  type?: never;
  disabled?: never;
  target?: string;
}

interface CustomButtonAsButton extends CustomButtonBaseProps {
  href?: never;
  type: "submit" | "button";
  disabled?: boolean;
}

type CustomButtonProps = CustomButtonAsLink | CustomButtonAsButton;

export default function CustomButton(props: CustomButtonProps) {
  const { text, className = "", onClick } = props;
  const [pulse, setPulse] = useState(false);

  const content = (
    <>
      <span className="text-[11px] sm:text-15 font-bold font-tasa leading-[1.3333333] rounded-[5px] bg-primary text-white p-20 uppercase inline-block cursor-pointer">
        <span
          className={`inline-block ${pulse ? "button-text-zoom-pulse" : ""}`}
        >
          {text}
        </span>
      </span>

      <span className="relative min-h-[35px] w-[35px] sm:w-[45px] lg:w-[50px] xl:w-[54px] 3xl:w-[59px] self-stretch rounded-[5px] bg-primary flex items-center justify-center overflow-hidden">
        <div className="relative w-[70%] h-[50%] flex justify-center items-center overflow-hidden">
          <Image
            src="/assets/icons/arrow-loop.svg"
            alt="Arrow Right"
            width={14}
            height={12}
            className="absolute w-auto h-[10px] xl:h-[14px] transition-transform duration-500 ease-in-out group-hover:translate-x-[300%]"
          />
          <Image
            src="/assets/icons/arrow-loop.svg"
            alt="Arrow Right"
            width={14}
            height={12}
            className="absolute w-auto h-[10px] xl:h-[14px] translate-x-[-700%] transition-transform duration-500 ease-in-out group-hover:translate-x-0"
          />
        </div>
      </span>
    </>
  );

  const sharedClassName = `inline-flex items-stretch gap-[3px] sm:gap-[5px] group ${className}`;
  const sharedHandlers = {
    onMouseEnter: () => setPulse(true),
    onAnimationEnd: () => setPulse(false),
  };

  if ("href" in props && props.href) {
    const isRealLink = props.href !== "#";

    return (
      <Link
        href={props.href}
        target={isRealLink ? props.target : undefined}
        rel={
          isRealLink && props.target === "_blank"
            ? "noopener noreferrer"
            : undefined
        }
        className={sharedClassName}
        {...sharedHandlers}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      className={`${sharedClassName} cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
      {...sharedHandlers}
    >
      {content}
    </button>
  );
}
