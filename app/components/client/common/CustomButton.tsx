"use client";

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
      <span className="text-[11px] sm:text-15 font-bold font-tasa leading-[1.3333333] rounded-[5px] bg-primary text-white p-20 uppercase inline-block">
        <span
          className={`inline-block ${pulse ? "button-text-zoom-pulse" : ""}`}
        >
          {text}
        </span>
      </span>

      <span className="relative min-h-[35px] w-[35px] sm:w-[45px] lg:w-[50px] xl:w-[54px] 3xl:w-[59px] self-stretch rounded-[5px] bg-primary flex items-center justify-center overflow-hidden">
        <div className="relative w-[70%] h-[50%] flex justify-center items-center overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="12"
            viewBox="0 0 14 12"
            fill="none"
            className="absolute transition-transform duration-500 ease-in-out group-hover:translate-x-[300%]"
          >
            <path
              d="M7.88745 11L12.0036 6.88384C12.4897 6.39773 12.4897 5.60227 12.0036 5.11616L7.88745 1"
              stroke="white"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 11L5.11616 6.88384C5.60227 6.39773 5.60227 5.60227 5.11616 5.11616L1 1"
              stroke="white"
              strokeOpacity="0.5"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="12"
            viewBox="0 0 14 12"
            fill="none"
            className="absolute translate-x-[-700%] transition-transform duration-500 ease-in-out group-hover:translate-x-0"
          >
            <path
              d="M7.88745 11L12.0036 6.88384C12.4897 6.39773 12.4897 5.60227 12.0036 5.11616L7.88745 1"
              stroke="white"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 11L5.11616 6.88384C5.60227 6.39773 5.60227 5.60227 5.11616 5.11616L1 1"
              stroke="white"
              strokeOpacity="0.5"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
    return (
      <Link href={props.href} className={sharedClassName} {...sharedHandlers}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      className={`${sharedClassName} disabled:opacity-50 disabled:cursor-not-allowed`}
      {...sharedHandlers}
    >
      {content}
    </button>
  );
}