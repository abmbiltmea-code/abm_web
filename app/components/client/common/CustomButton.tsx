"use client";

import Link from "next/link";

interface CustomButtonProps {
  text: string;
  href: string;
  className?: string;
}

export default function CustomButton({
  text,
  href,
  className = "",
}: CustomButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-stretch gap-[5px] group ${className}`}
    >
      <span className="text-15 font-bold font-tasa leading-[1.3333333] rounded-[5px] bg-primary text-white p-20 uppercase">
        {text}
      </span>

      <span className="relative w-[59px] self-stretch rounded-[5px] bg-primary flex items-center justify-center overflow-hidden">
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
      </span>
    </Link>
  );
}
