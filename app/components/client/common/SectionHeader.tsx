import SectionLabel from "./SectionLabel";
import SectionTitle from "../animations/SectionTitle";
import SectionDescription from "../animations/SectionDescription";

type SectionHeaderProps = {
  labelTitle: string;
  sectionTitle: string;
  sectionDescription: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

const SectionHeader = ({
  labelTitle,
  sectionTitle,
  sectionDescription,
  className = "pt-70 3xl:pt-[73px] pb-[60px] md:pb-120 3xl:pb-150",
  titleClassName = "",
  descriptionClassName = "",
}: SectionHeaderProps) => {
  return (
    <section className={`container ${className}`}>
      <div
        className={`flex flex-col lg:flex-row 3xl:justify-between gap-y-[20px] md:gap-y-[30px]`}
      >
        <div>
          <SectionLabel title={labelTitle} pt="lg:pt-[10px]" />
        </div>
        <div className="flex flex-col lg:section-content-spacing gap-20">
          <SectionTitle title={sectionTitle} className={titleClassName} />
          <SectionDescription
            text={sectionDescription}
            className={descriptionClassName + " text-description-color text-description-2"} 
          />
        </div>
      </div>
    </section>
  );
};

export default SectionHeader;
