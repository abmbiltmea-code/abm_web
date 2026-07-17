import SectionTitle from "../../animations/SectionTitle";
import SectionDescription from "../../animations/SectionDescription";
import AnimatedDivider from "../../animations/AnimatedDivider";

const TeamHeader = ({title, description}: {title: string, description: string}) => {
  return (
    <section className="container pt-[29px] md:pt-90 pb-40">
      <div className="flex flex-col gap-[10px] md:gap-5">
        <SectionTitle title={title} />
        <SectionDescription
          text={description}
          className="text-description-color text-description-2 max-w-[90%] 3xl:max-w-[1283px]"
        />
      </div>
      <div className="lg:hidden relative h-px mt-[30px]">
        <AnimatedDivider className="absolute bottom-0 left-0 w-full h-px border-border-color" />
      </div>
    </section>
  );
};

export default TeamHeader;
