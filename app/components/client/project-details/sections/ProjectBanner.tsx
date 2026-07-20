import SectionReveal from "../../animations/SectionReveal";
import SectionTitle from "../../animations/SectionTitle";
import { moveUp } from "../../animations/motionVariants";
import Breadcrumb from "../../common/Breadcrumb";

const ProjectBanner = ({ title }: { title: string }) => {
  return (
    <section className="container pt-[157px] md:pt-300 pb-5 md:pb-[60px]">
      <SectionTitle title={title} className="mb-5 xl:mb-[14px] text-70 leading-[1.2142857143]" />
      <SectionReveal variants={moveUp(0.2)}>
        <Breadcrumb variant="1" />
      </SectionReveal>
    </section>
  );
};

export default ProjectBanner;
