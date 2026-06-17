import Image from "next/image";
import Breadcrumb from "./Breadcrumb";

interface PageBannerProps {
  title: string;
  bannerImage: string;
  imageAlt?: string;
}

export default function InnerBanner({
  title,
  bannerImage,
  imageAlt = "",
}: PageBannerProps) {
  return (
    <section className="relative w-full h-[600px] 3xl:h-[690px] overflow-hidden">
      {/* Background image */}
      <Image
        src={bannerImage}
        alt={imageAlt}
        fill
        priority
        className="object-cover object-center"
      />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
linear-gradient(249.19deg, rgba(0, 0, 0, 0) 20.77%, rgba(0, 0, 0, 0.8) 95.01%)`,
        }}
      />

      {/* Title — centered in visible area (top to just above pill) */}
      <div className="absolute inset-x-0 top-0 bottom-[67px] flex items-center justify-center">
        <div className="container mt-[1px]">
          <h1 className="text-white hero-title">{title}</h1>
        </div>
      </div>

      {/* Breadcrumb — 46px above the white pill */}
      <div className="absolute inset-x-0 bottom-[112px]">
        <div className="container">
          <Breadcrumb />
        </div>
      </div>

      {/* Watermark — sits directly on top of the white pill */}
      <div className="absolute bottom-[67px] left-[18px] pointer-events-none">
        <Image
          src="/assets/images/logos/abm-watermark-banner.svg"
          alt="ABM Watermark"
          width={853}
          height={225}
          className="h-[170px] 3xl:h-[225px] w-auto"
        />
      </div>

      {/* White bottom pill */}
      <div className="absolute bottom-0 inset-x-0 h-[67px] rounded-t-[30px] bg-white" />
    </section>
  );
}
