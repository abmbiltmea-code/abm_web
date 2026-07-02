"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { footerData } from "../layout/data";

export default function Footer() {
  const { logo, address, phone, email, navLinks, legal, socials } = footerData;
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
    <footer className="bg-black/4 w-full">
      <div className="container relative" ref={containerRef}>
        {/* Main row */}
        <div className="flex border-b border-black/20">
          <div className="flex flex-col 3xl:flex-row pt-100 pb-50">
            {/* Left — Logo */}
            <div className="shrink-0 pr-50 min-[1800px]:pr-[53.23px] mb-40">
              <Image
                src={logo.src}
                alt="logo"
                width={1300}
                height={270}
                className="h-[66px] w-auto"
              />
            </div>
            {/* Middle — Contact info */}
            <div className="flex flex-col">
              <div className="flex items-start gap-[15px]">
                <Image
                  src={address.icon}
                  alt="Address"
                  width={24}
                  height={24}
                  className="mt-1 shrink-0"
                />
                <div className="flex flex-col gap-[5px]">
                  <span className="text-subtitle text-secondary">ADDRESS</span>
                  <p className="text-description-2 text-description-color 3xl:whitespace-nowrap flex gap-[10px]">
                    {address.value.map((item, index) => (
                      <span key={index} dangerouslySetInnerHTML={{ __html: item }} />
                    ))}
                  </p>
                </div>
              </div>
              <div className="flex gap-10 3xl:gap-[57px] mt-30 3xl:mt-40">
                <div className="flex items-start gap-[15px]">
                  <Image
                    src={phone.icon}
                    alt="Phone"
                    width={24}
                    height={24}
                    className="mt-1 shrink-0"
                  />
                  <div className="flex flex-col gap-[5px]">
                    <span className="text-subtitle text-secondary">
                      {phone.label}
                    </span>
                    <a
                      href={phone.href}
                      className="text-description-2 text-description-color"
                    >
                      {phone.value}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-[15px]">
                  <Image
                    src={email.icon}
                    alt="Email"
                    width={24}
                    height={24}
                    className="mt-1 shrink-0"
                  />
                  <div className="flex flex-col gap-[5px]">
                    <span className="text-subtitle text-secondary">
                      {email.label}
                    </span>
                    <a
                      href={email.href}
                      className="text-description-2 text-description-color"
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
          <div ref={navRef} className="flex-1 pt-100 pb-50">
            <nav className="grid grid-cols-3 min-[1800px]:grid-cols-[234px_210px_190px] gap-x-[35px] gap-y-30">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-subtitle text-secondary hover:text-primary transition-colors duration-300 whitespace-nowrap flex group gap-20 3xl:gap-[23px]"
                >
                  {link.label}
                  <Image
                    src="/assets/icons/double-arrow-primary.svg"
                    alt=""
                    width={14}
                    height={14}
                    className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-3 transition-all duration-300"
                  />
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom row — legal + socials */}
        <div className="flex items-center justify-between pt-30 pb-100">
          {/* Legal */}
          <div className="flex items-center gap-30 3xl:gap-[28px]">
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
            className="absolute flex items-center gap-30"
            style={{ left: socialsOffset ? `${socialsOffset}px` : undefined }}
          >
            {socials.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                className="flex items-center gap-[10px] text-subtitle hover:text-primary transition-colors duration-300 group"
              >
                {social.label}
                <div>
                  <Image
                    src="/assets/icons/arrow-right-top.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="group-hover:rotate-45 group-hover:translate-x-1 transition-transform duration-300"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
