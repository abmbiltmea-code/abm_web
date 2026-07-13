import SectionTitle from "../../animations/SectionTitle";
import Breadcrumb from "../../common/Breadcrumb";

const ProjectBanner = ({ title }: { title: string }) => {
  return (
    <section className="container pt-300 pb-[60px]">
      <SectionTitle title={title} className="mb-[14px] text-70 leading-[1.2142857143]" />
      <Breadcrumb variant="1" />
    </section>
  );
};

export default ProjectBanner;
