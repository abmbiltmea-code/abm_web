"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { footerData } from "../layout/data";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Footer() {
  const { logo, address, phone, email, navLinks, legal, socials } = footerData;
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [socialsOffset, setSocialsOffset] = useState(0);
  const rafRef = useRef<number>(0);

  const calculate = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!navRef.current || !containerRef.current) return;
      const containerLeft = containerRef.current.getBoundingClientRect().left;
      const navLeft = navRef.current.getBoundingClientRect().left;
      setSocialsOffset(navLeft - containerLeft);
    });
  }, []);

  useLayoutEffect(() => {
    calculate();

    const ro = new ResizeObserver(calculate);
    if (containerRef.current) ro.observe(containerRef.current);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [calculate]);

  return (
    <footer className="bg-black/4 w-full overflow-hidden">
      <div className="container relative" ref={containerRef}>
        {/* Main row */}
        <div className="flex flex-col lg:flex-row lg:border-b lg:border-black/20">
          <div className="flex flex-col 3xl:flex-row pt-120 lg:pt-100 pb-50 relative">
            <div className="lg:hidden absolute bottom-0 left-0 w-full h-px bg-black/20 overflow-hidden">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0 bg-primary origin-left"
              />
            </div>
            {/* Left — Logo */}
            <div className="shrink-0 lg:pr-50 min-[1800px]:pr-[53.23px] mb-40 w-fit">
              <Link href="/">
                <Image
                  src={logo.src}
                  alt="logo"
                  width={1300}
                  height={270}
                  className="h-[36.15px] sm:h-[66px] w-auto pointer-events-none"
                />
              </Link>
            </div>
            {/* Middle — Contact info */}
            <div className="flex flex-col">
              <div className="flex items-start gap-[10px] sm:gap-[15px]">
                <Image
                  src={address.icon}
                  alt="Address"
                  width={24}
                  height={24}
                  className="mt-1 shrink-0 pointer-events-none w-5 h-5 sm:w-6 sm:h-6"
                />
                <div className="flex flex-col gap-[5px]">
                  <span className="font-tasa font-bold text-[10px] leading-none sm:text-subtitle text-secondary">
                    ADDRESS
                  </span>
                  <p className="text-description-2 text-description-color flex gap-[10px] hover:text-primary transition-colors duration-300 text-wrap max-w-[40ch]">
                    <Link target="_blank" href={address.href}>
                      {address.value}
                    </Link>
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-5 sm:gap-10 3xl:gap-[57px] mt-5 sm:mt-30 3xl:mt-40">
                <div className="flex items-start gap-[10px] sm:gap-[15px]">
                  <Image
                    src={phone.icon}
                    alt="Phone"
                    width={24}
                    height={24}
                    className="mt-1 shrink-0 pointer-events-none w-5 h-5 sm:w-6 sm:h-6"
                  />
                  <div className="flex flex-col gap-[5px]">
                    <span className="font-tasa font-bold text-[10px] leading-none sm:text-subtitle text-secondary">
                      {phone.label}
                    </span>
                    <a
                      href={phone.href}
                      className="text-description-2 text-description-color hover:text-primary transition-colors duration-300"
                    >
                      {phone.value}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-[10px] sm:gap-[15px]">
                  <Image
                    src={email.icon}
                    alt="Email"
                    width={24}
                    height={24}
                    className="mt-1 shrink-0 pointer-events-none w-5 h-5 sm:w-6 sm:h-6"
                  />
                  <div className="flex flex-col gap-[5px]">
                    <span className="font-tasa font-bold text-[10px] leading-none sm:text-subtitle text-secondary">
                      {email.label}
                    </span>
                    <a
                      href={email.href}
                      className="text-description-2 text-description-color hover:text-primary transition-colors duration-300"
                    >
                      {email.value}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px bg-black/20 self-stretch ml-70 2xl:ml-[150px] min-[1800px]:ml-[78px] mr-70 min-[1800px]:mr-[68px]" />

          {/* Right — Nav grid */}
          <div ref={navRef} className="flex-1 pt-40 lg:pt-100 pb-50">
            <nav className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 min-[1800px]:grid-cols-[234px_210px_190px] gap-x-[35px] gap-y-[30px] lg:gap-y-30">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`text-subtitle transition-colors duration-300 whitespace-nowrap flex group gap-20 3xl:gap-[23px] ${
                      isActive
                        ? "text-primary"
                        : "text-secondary hover:text-primary"
                    }`}
                  >
                    {link.label}
                    <Image
                      src="/assets/icons/double-arrow-primary.svg"
                      alt=""
                      width={14}
                      height={14}
                      className={`transition-all duration-300 pointer-events-none ${
                        isActive
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Socials - mobile */}
        <div className="lg:hidden flex items-center gap-5 sm:gap-30 py-5 relative">
          <div className="absolute top-0 left-0 h-px w-full bg-black/20 overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 bg-primary origin-left"
            />
          </div>
          <div className="absolute bottom-0 left-0 h-px w-full bg-black/20 overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 bg-primary origin-left"
            />
          </div>
          {socials.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              // target="_blank"
              className="flex items-center gap-[5px] md:gap-[10px] text-subtitle hover:text-primary transition-colors duration-300 group"
            >
              {social.label}
              <div>
                <Image
                  src="/assets/icons/arrow-right-top.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="h-3 w-3 md:h-4 md:w-4 group-hover:rotate-45 group-hover:translate-x-1 transition-transform duration-300 pointer-events-none"
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom row — legal + socials */}
        <div className="flex items-center justify-between pt-[30px] lg:pt-30 pb-100">
          {/* Legal */}
          <div className="flex items-center gap-[15px] sm:gap-30 3xl:gap-[28px]">
            {legal.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-description-2 text-secondary/80 hover:text-primary transition-colors duration-300"
                dangerouslySetInnerHTML={{ __html: item.label }}
              />
            ))}
          </div>

          {/* Socials — offset from container left to match nav start */}
          <div
            className="hidden lg:flex absolute items-center gap-30"
            style={{ left: socialsOffset ? `${socialsOffset}px` : undefined }}
          >
            {socials.map((social) => (
              <Link
                key={social.label}
                href={social.href}
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
    </footer>
  );
}
