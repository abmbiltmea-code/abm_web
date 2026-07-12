"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { DropdownMenuItems, footerData } from "./data";
import { useContainerInset } from "@/app/hooks/useContainerInset";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function FullscreenMenu({ isOpen, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const inset = useContainerInset();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;

    const items = itemsRef.current.filter(Boolean);

    if (isOpen) {
      gsap.set(el, { display: "flex" });
      gsap.set(items, { y: 40, opacity: 0 });
      gsap.fromTo(
        el,
        { clipPath: "inset(0% 0 100% 0)" },
        { clipPath: "inset(0% 0 0% 0)", duration: 0.7, ease: "power4.inOut" },
      );
      gsap.to(items, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.35,
      });
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(el, {
        clipPath: "inset(0% 0 100% 0)",
        duration: 0.6,
        ease: "power4.inOut",
        onComplete: () => gsap.set(el, { display: "none" }),
      });
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[1000] hidden bg-white"
      style={{ clipPath: "inset(0% 0 100% 0)" }}
    >
      {/* left active image */}
      <div className="relative hidden h-full w-[40%] 3xl:w-[41.93%] shrink-0 xl:block">
        {DropdownMenuItems.map((item, i) => (
          <Image
            key={item.href}
            src={item.image}
            alt={item.label}
            fill
            priority={i === 0}
            className={`object-cover transition-opacity duration-500 ease-in-out pointer-events-none ${
              activeIndex === i ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* right content */}
      <div
        style={{ paddingRight: inset }}
        className="flex h-full flex-1 flex-col justify-between"
      >
        <div className="flex justify-end mr-40 mt-90 3xl:mt-[93px]">
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-[35px] w-[40px] cursor-pointer items-center justify-center bg-black/10 xl:h-[50px] xl:w-[60px] rounded-[5px]"
          >
            <Image
              src="/assets/icons/close-black.svg"
              alt="Close"
              width={20}
              height={20}
              className="pointer-events-none h-[14px] w-auto md:h-[20px]"
            />
          </button>
        </div>

        <div className="flex flex-col">
          <ul className="flex flex-col">
            {DropdownMenuItems.map((item, i) => {
              const isActive = activeIndex === i;
              return (
                <li
                  key={item.href}
                  ref={(node) => {
                    itemsRef.current[i] = node;
                  }}
                  onMouseEnter={() => setActiveIndex(i)}
                  className="relative flex items-center gap-100 py-30 3xl:py-[35px] pl-60 3xl:pl-80"
                >
                  <span
                    className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent transition-opacity duration-300 ease-in-out ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <span
                    className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent transition-opacity duration-300 ease-in-out ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`text-subtitle-3 uppercase transition-colors duration-300 ease-in-out`}
                  >
                    {item.label}
                  </Link>

                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-5 text-15 font-tasa font-bold uppercase text-primary transition-all duration-300 ease-in-out ${
                      isActive ? "opacity-100 translate-x-0" : "pointer-events-none opacity-0 -translate-x-5"
                    }`}
                  >
                    View More
                    <Image
                      src="/assets/icons/double-arrow-primary.svg"
                      alt="Arrow right"
                      width={14}
                      height={12}
                      className="pointer-events-none"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-100 3xl:mt-120 ml-60 3xl:ml-80 h-px w-full bg-black/10" />

          <div className="mt-5 ml-60 3xl:ml-80 flex items-center gap-30 mb-90 3xl:mb-[93px]">
            {footerData.socials.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                onClick={onClose}
                // target="_blank"
                className="flex items-center gap-[10px] text-subtitle hover:text-primary transition-colors duration-300 group"
              >
                {social.label}
                <div className="text-[#333333] group-hover:text-primary transition-colors duration-300">
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="group-hover:rotate-45 group-hover:translate-x-1 transition-transform duration-300 pointer-events-none"
                  >
                    <path
                      d="M15 1L1 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15 11.27V1H4.73"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}