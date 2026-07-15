"use client";

import { useState } from "react";

interface NewsletterFormProps {
  onSubmit?: (email: string) => void;
  className?: string;
}

export default function NewsletterForm({
  onSubmit,
  className = "",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (!email) return;
    onSubmit?.(email);
  };

  return (
    <div
      className={`flex items-stretch justify-between w-full max-w-[488px] max-h-[62px] rounded-[5px] border border-border-color overflow-hidden ${className}`}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Your Email"
        className="w-[54.31%] bg-transparent text-white placeholder-description-color outline-none text-description-2 py-[9px] sm:py-[16px] px-[9px] sm:px-5"
      />

      <button
        type="button"
        onClick={handleSubmit}
        className="w-[155px] sm:w-[45.69%] 3xl:min-w-[223px] text-[11px] sm:text-15 font-bold font-tasa leading-[1.3333333] rounded-[4px] bg-primary text-white p-20 uppercase cursor-pointer group"
      >
        <p className="group-hover:scale-[1.04] transition-all duration-500">Subscribe to Updates</p>
      </button>
    </div>
  );
}
