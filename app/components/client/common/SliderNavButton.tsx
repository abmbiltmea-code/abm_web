"use client";

import Image from "next/image";

interface SliderNavButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
  className?: string;
}

export default function SliderNavButton({
  direction,
  onClick,
  className = "",
}: SliderNavButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "prev" ? "Previous image" : "Next image"}
      className={`flex h-12.5 w-12.5 items-center justify-center rounded-full bg-primary/10 border border-white cursor-pointer ${className}`}
    >
      <Image
        src="/assets/icons/arrow-right-primary.svg"
        alt=""
        width={23}
        height={17}
        className={direction === "prev" ? "rotate-180" : ""}
      />
    </button>
  );
}