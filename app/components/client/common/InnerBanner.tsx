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
    <section className="relative w-full h-[308px] sm:h-[450px] lg:h-[600px] 3xl:h-[690px] overflow-hidden">
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
linear-gradient(249.19deg, rgba(0, 0, 0, 0) 28.77%, rgba(0, 0, 0, 0.8) 95.01%)`,
        }}
      />

      {/* Title */}
      <div className="absolute inset-x-0 md:top-0 bottom-[113px] md:bottom-[67px] flex items-center justify-center">
        <div className="container mt-px">
          <h1 className="text-white hero-title">{title}</h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="absolute inset-x-0 bottom-[46px] md:bottom-[70px] 2xl:bottom-[112px]">
        <div className="container">
          <Breadcrumb />
        </div>
      </div>

      {/* Watermark */}
      <div className="absolute bottom-[31px] lg:bottom-[40px] xl:bottom-[50px] 3xl:bottom-[67px] left-[18px] pointer-events-none">
        <Image
          src="/assets/images/logos/abm-watermark-banner.svg"
          alt="ABM Watermark"
          width={853}
          height={225}
          className="h-[70px] md:h-[170px] lg:h-[180px] xl:h-[200px] 3xl:h-[225px] w-auto"
        />
      </div>

      {/* White bottom pill */}
      <div className="absolute bottom-0 inset-x-0 h-[31px] lg:h-[40px] xl:h-[50px] 3xl:h-[67px] rounded-t-[15px] md:rounded-t-[30px] bg-white" />
    </section>
  );
}
