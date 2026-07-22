"use client";

import Image from "next/image";
import SectionTitle from "../../animations/SectionTitle";
import SectionDescription from "../../animations/SectionDescription";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import AnimatedDivider from "../../animations/AnimatedDivider";
import { FirstSection } from "@/app/types/contact";
import Link from "next/link";

export default function LetsConnect({
  data,
  address,
}: {
  data: FirstSection;
  address: string;
}) {
  const imageRef = useRef<HTMLImageElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { yPercent: -10, scale: 1 },
        {
          yPercent: 10,
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="container pt-[29px] md:pt-70 3xl:pt-[73px] pb-[60px] md:pb-120 3xl:pb-150"
    >
      <div className="flex flex-col xl:flex-row gap-5 sm:gap-40 2xl:gap-80 3xl:gap-[97px] justify-between">
        {/* Left */}
        <div className="flex flex-col justify-center w-full">
          <SectionTitle title={data.title} className="mb-5" />

          <SectionDescription
            text={data.description}
            className="!text-description-2 text-description-color mb-50 max-w-[50ch]"
          />

          <div className="xl:hidden w-full mb-5 rounded-[10px] overflow-hidden">
            <div className="relative w-full h-[251px] sm:h-[320px] md:h-[400px] lg:h-[500px]rounded-[10px] overflow-hidden">
              <Image
                ref={imageRef}
                src={data.image}
                alt={data.imageAlt}
                fill
                className="object-cover object-top pointer-events-none"
              />
            </div>
          </div>

          <div className="bg-cream-background xl:rounded-[10px] px-[15px] py-5 md:p-30 3xl:p-40">
            <div className="flex justify-between sm:justify-start xl:grid xl:grid-cols-1 2xl:grid-cols-2 gap-30 md:gap-100 xl:gap-30 2xl:gap-50 3xl:gap-120 min-[1900px]:gap-[172px]">
              {/* Address */}
              <div className="flex items-start min-[1900px]:min-w-[330px] w-[50%] xl:w-auto">
                <Image
                  src={"/assets/icons/contact-us/location.svg"}
                  alt={data.address}
                  width={32}
                  height={32}
                  className="shrink-0 h-5 xl:h-7 3xl:h-[32px] w-auto sm:mt-[7px] mr-[5px] sm:mr-2 xl:mr-5 pointer-events-none"
                />
                <div>
                  <p className="text-subtitle-2 mb-[7px] sm:mb-[10px]">
                    ADDRESS
                  </p>
                  <Link
                    target="_blank"
                    href={
                      address || "https://maps.app.goo.gl/5tCAML4NaT5EDX4Y6"
                    }
                    dangerouslySetInnerHTML={{ __html: data.address }}
                    className="text-description-2 text-description-color"
                  />
                </div>
              </div>

              <AnimatedDivider className="hidden xl:block 2xl:hidden w-full h-px border-border-color" />

              {/* Phone */}
              <div className="flex items-start min-[1900px]:min-w-[350px]">
                <Image
                  src={"/assets/icons/contact-us/phone.svg"}
                  alt={data.phone}
                  width={32}
                  height={32}
                  className="shrink-0 h-5 xl:h-7 3xl:h-[32px] w-auto sm:mt-[7px] mr-[5px] sm:mr-2 xl:mr-5 pointer-events-none"
                />
                <div>
                  <p className="text-subtitle-2 mb-[7px] sm:mb-[10px]">PHONE</p>
                  <Link
                    href={`tel:${data.phone}`}
                    className="text-description-2 text-description-color"
                  >
                    {data.phone}
                  </Link>
                </div>
              </div>
            </div>

            {/* Divider */}
            <AnimatedDivider className="w-full h-px border-border-color my-[15px] sm:my-5 md:my-30" />

            <div className="flex justify-between sm:justify-start xl:grid xl:grid-cols-1 2xl:grid-cols-2 gap-30 md:gap-100 xl:gap-30 2xl:gap-50 3xl:gap-120 min-[1900px]:gap-[172px]">
              {/* Email */}
              <div className="flex items-start min-[1900px]:min-w-[350px] w-[50%] xl:w-auto">
                <Image
                  src={"/assets/icons/contact-us/email.svg"}
                  alt={data.email}
                  width={32}
                  height={32}
                  className="shrink-0 h-5 xl:h-7 3xl:h-[32px] w-auto sm:mt-[7px] mr-[5px] sm:mr-2 xl:mr-5 pointer-events-none"
                />
                <div>
                  <p className="text-subtitle-2 mb-[7px] sm:mb-[10px]">EMAIL</p>
                  <Link
                    href={`mailto:${data.email}`}
                    className="text-description-2 text-description-color"
                  >
                    {data.email}
                  </Link>
                </div>
              </div>

              <AnimatedDivider className="hidden xl:block 2xl:hidden w-full h-px border-border-color" />

              {/* Fax */}
              <div className="flex items-start min-[1900px]:min-w-[350px]">
                <Image
                  src={"/assets/icons/contact-us/fax.svg"}
                  alt={data.fax}
                  width={32}
                  height={32}
                  className="shrink-0 h-5 xl:h-7 3xl:h-[32px] w-auto sm:mt-[7px] mr-[5px] sm:mr-2 xl:mr-5 pointer-events-none"
                />
                <div>
                  <p className="text-subtitle-2 mb-[7px] sm:mb-[10px]">FAX</p>
                  <p className="text-description-2 text-description-color">
                    {data.fax}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="hidden xl:block w-full xl:w-auto shrink-0 xl:self-stretch">
          <div className="relative w-full h-[280px] md:h-[400px] lg:h-[500px] xl:w-[600px] xl:h-full 3xl:w-[850px] rounded-[10px] overflow-hidden">
            <Image
              ref={imageRef}
              src={data.image}
              alt={data.imageAlt}
              fill
              className="object-cover object-top pointer-events-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
