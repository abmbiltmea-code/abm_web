"use client";

import Image from "next/image";
import { CONNECT_INFO } from "../data";
import SectionTitle from "../../animations/SectionTitle";
import SectionDescription from "../../animations/SectionDescription";

export default function LetsConnect() {
  const [address, phone, email, fax] = CONNECT_INFO.details;

  return (
    <section className="container pt-[29px] md:pt-70 3xl:pt-[73px] pb-[60px] md:pb-120 3xl:pb-150">
      <div className="flex flex-col xl:flex-row gap-5 sm:gap-40 2xl:gap-80 3xl:gap-[97px] justify-between">
        {/* Left */}
        <div className="flex flex-col justify-center w-full">
          <SectionTitle title={CONNECT_INFO.heading} className="mb-5" />

          <SectionDescription
            text={CONNECT_INFO.description}
            className="!text-description-2 text-description-color mb-50 max-w-[50ch]"
          />

          <div className="xl:hidden w-full mb-5 rounded-[10px] overflow-hidden">
            <div className="relative w-full h-[251px] sm:h-[320px] md:h-[400px] lg:h-[500px]rounded-[10px] overflow-hidden">
              <Image
                src={CONNECT_INFO.image.src}
                alt={CONNECT_INFO.image.alt}
                fill
                className="object-cover object-top"
              />
            </div>
          </div>

          <div className="bg-cream-background xl:rounded-[10px] px-[15px] py-5 md:p-30 3xl:p-40">
            <div className="flex justify-between sm:justify-start xl:grid xl:grid-cols-1 2xl:grid-cols-2 gap-30 md:gap-100 xl:gap-30 2xl:gap-50 3xl:gap-120 min-[1900px]:gap-[172px]">
              {/* Address */}
              <div className="flex items-start min-[1900px]:min-w-[330px] w-[50%] xl:w-auto">
                <Image
                  src={address.icon}
                  alt={address.label}
                  width={32}
                  height={32}
                  className="shrink-0 h-5 xl:h-7 3xl:h-[32px] w-auto sm:mt-[7px] mr-[5px] sm:mr-2 xl:mr-5"
                />
                <div>
                  <p className="text-subtitle-2 mb-[7px] sm:mb-[10px]">
                    {address.label}
                  </p>
                  <p
                    dangerouslySetInnerHTML={{ __html: address.lines }}
                    className="text-description-2 text-description-color"
                  />
                </div>
              </div>

              <div className="hidden xl:block 2xl:hidden w-full h-px bg-border-color" />

              {/* Phone */}
              <div className="flex items-start min-[1900px]:min-w-[350px]">
                <Image
                  src={phone.icon}
                  alt={phone.label}
                  width={32}
                  height={32}
                  className="shrink-0 h-5 xl:h-7 3xl:h-[32px] w-auto sm:mt-[7px] mr-[5px] sm:mr-2 xl:mr-5"
                />
                <div>
                  <p className="text-subtitle-2 mb-[7px] sm:mb-[10px]">
                    {phone.label}
                  </p>
                  <p className="text-description-2 text-description-color">
                    {phone.lines}
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-border-color my-[15px] sm:my-5 md:my-30" />

            <div className="flex justify-between sm:justify-start xl:grid xl:grid-cols-1 2xl:grid-cols-2 gap-30 md:gap-100 xl:gap-30 2xl:gap-50 3xl:gap-120 min-[1900px]:gap-[172px]">
              {/* Email */}
              <div className="flex items-start min-[1900px]:min-w-[350px] w-[50%] xl:w-auto">
                <Image
                  src={email.icon}
                  alt={email.label}
                  width={32}
                  height={32}
                  className="shrink-0 h-5 xl:h-7 3xl:h-[32px] w-auto sm:mt-[7px] mr-[5px] sm:mr-2 xl:mr-5"
                />
                <div>
                  <p className="text-subtitle-2 mb-[7px] sm:mb-[10px]">
                    {email.label}
                  </p>
                  <p className="text-description-2 text-description-color">
                    {email.lines}
                  </p>
                </div>
              </div>

              <div className="hidden xl:block 2xl:hidden w-full h-px bg-border-color" />

              {/* Fax */}
              <div className="flex items-start min-[1900px]:min-w-[350px]">
                <Image
                  src={fax.icon}
                  alt={fax.label}
                  width={32}
                  height={32}
                  className="shrink-0 h-5 xl:h-7 3xl:h-[32px] w-auto sm:mt-[7px] mr-[5px] sm:mr-2 xl:mr-5"
                />
                <div>
                  <p className="text-subtitle-2 mb-[7px] sm:mb-[10px]">
                    {fax.label}
                  </p>
                  <p className="text-description-2 text-description-color">
                    {fax.lines}
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
              src={CONNECT_INFO.image.src}
              alt={CONNECT_INFO.image.alt}
              fill
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
