import { careerDetailData } from "../data";
import SectionTitle from "../../animations/SectionTitle";
import SectionDescription from "../../animations/SectionDescription";

export default function CareerDetails() {
  const { description } = careerDetailData;

  return (
    <section className="container pb-[60px] md:pb-120 3xl:pb-150">
      <div className="lg:section-content-spacing-2">
        <SectionTitle title="job description" className="mb-5" />
        <SectionDescription html={description} className="text-description-color !text-description-2 space-y-[30px]" />
      </div>
    </section>
  );
}
