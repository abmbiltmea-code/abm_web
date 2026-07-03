import Image from "next/image";
import { contactSectionData } from "../data";
import SectionTitle from "@/app/components/client/animations/SectionTitle";
import SectionDescription from "@/app/components/client/animations/SectionDescription";
import ContactForm from "./ContactForm";
import Link from "next/link";

export default function ContactSection() {
  const { backgroundImage, title, description, contactInfo } =
    contactSectionData;

  return (
    <section className="relative min-h-screen py-120 3xl:py-140 overflow-hidden">
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt="Contact background"
        fill
        className="object-cover object-center z-0"
        priority
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/65 z-1" />

      <div className="relative z-10 container flex flex-col lg:flex-row justify-between gap-80">
        {/* Left */}
        <div className="flex flex-col max-w-[711px]">
          <div className="flex flex-col gap-20 mb-80">
            <SectionTitle title={title} className="text-white max-w-[20ch]" />
            <SectionDescription
              text={description}
              className="text-white/80 max-w-[50ch]"
            />
          </div>

          <div className="flex flex-col gap-30">
            {contactInfo.map((info) => (
              <div key={info.title} className="flex items-center gap-20">
                <div className="w-15 h-15 rounded-[5px] bg-white/10 backdrop-blur-2xl flex items-center justify-center shrink-0">
                  <Image
                    src={info.icon}
                    alt={info.title}
                    width={25}
                    height={25}
                    className="pointer-events-none"
                  />
                </div>
                <div className="flex flex-col gap-[5px]">
                  <p className="text-white text-subtitle">{info.title}</p>
                  {info.href ? (
                    <Link
                      href={info.href}
                      {...(!info.href.startsWith("tel:") &&
                      !info.href.startsWith("mailto:")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="text-white/80 text-description hover:text-white transition-colors"
                      dangerouslySetInnerHTML={{ __html: info.value }}
                    />
                  ) : (
                    <p
                      className="text-white/80 text-description"
                      dangerouslySetInnerHTML={{ __html: info.value }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <ContactForm />
      </div>
    </section>
  );
}
