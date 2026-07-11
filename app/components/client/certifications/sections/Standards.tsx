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
    <section className="relative py-[60px] md:py-120 3xl:py-150">
      <div className="bg-cream-background absolute inset-0 h-[66%]" />
      <div className="relative container">
        <SectionTitle title="Compliance & Standards" className="mb-50" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
          {standards.map((standard, index) => (
            <div
              key={index}
              className="flex items-center gap-20 border border-border-color rounded-[10px] px-40 py-40 3xl:py-[38px]"
            >
              <div className="box-size bg-primary rounded-[5px] flex items-center justify-center">
                <Image
                  src={standard.icon}
                  alt={standard.title}
                  width={40}
                  height={40}
                  className="pointer-events-none h-[34px] 3xl:h-[40px] w-auto"
                />
              </div>
              <h3 className="text-subtitle-3">{standard.title}</h3>
            </div>
          ))}
        </div>

        <div className="mt-100">
          <InnerCtaSecondary
            title={ctaData2.ctaTitle}
            maxTitleWidth="max-w-[30ch]"
            btnText={ctaData2.ctaBtnText}
            btnLink={ctaData2.ctaBtnLink}
          />
        </div>
      </div>
    </section>
  );
};

export default Standards;
