import SectionTitle from "../../animations/SectionTitle";
import Image from "next/image";
import InnerCtaSecondary from "../../common/InnerCtaSecondary";

const Standards = ({
  standards,
  ctaData2,
}: {
  standards: any[];
  ctaData2: any;
}) => {
  return (
    <>
    <section className="relative pb-[60px] md:pb-120 3xl:pb-150 pt-120 3xl:pt-140">
      <div className="bg-cream-background absolute inset-0 h-full lg:h-[66%]" />
      <div className="relative container">
        <SectionTitle title="Compliance & Standards" className="mb-50" />
        <div className="flex flex-wrap justify-center gap-20">
          {standards.map((standard, index) => (
            <div
              key={index}
              className="flex items-center gap-20 border border-border-color rounded-[10px] px-[15px] sm:px-5 lg:px-40 py-5 lg:py-40 3xl:py-[38px] w-full md:w-[calc(50%-10px)] min-[1200px]:w-[calc(33.3333%-13.3333px)]"
            >
              <div className="box-size bg-primary rounded-[5px] flex items-center justify-center">
                <Image
                  src={standard.icon}
                  alt={standard.title}
                  width={40}
                  height={40}
                  className="pointer-events-none h-5 md:h-6 xl:h-[34px] 3xl:h-[40px] w-auto"
                />
              </div>
              <h3 className="text-subtitle-3">{standard.title}</h3>
            </div>
          ))}
        </div>

        <div className="hidden lg:block mt-100">
          <InnerCtaSecondary
            title={ctaData2.ctaTitle}
            maxTitleWidth="max-w-[30ch]"
            btnText={ctaData2.ctaBtnText}
            btnLink={ctaData2.ctaBtnLink}
          />
        </div>
      </div>
    </section>
          <div className="lg:hidden container py-[60px]">
        <InnerCtaSecondary
          title={ctaData2.ctaTitle}
          maxTitleWidth="max-w-[35ch]"
          btnText={ctaData2.ctaBtnText}
          btnLink={ctaData2.ctaBtnLink}
        />
      </div>
    </>
  );
};

export default Standards;
