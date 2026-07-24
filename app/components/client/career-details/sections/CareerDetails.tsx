import { JobDoc } from "@/app/types/careers";
import SectionTitle from "../../animations/SectionTitle";
import SectionDescription from "../../animations/SectionDescription";
import SectionReveal from "../../animations/SectionReveal";
import { moveUp } from "../../animations/motionVariants";

export default function CareerDetails({ data }: { data: JobDoc }) {
  return (
    <section className="container pb-[60px] md:pb-120 3xl:pb-150">
      <div className="lg:section-content-spacing-2">
        <SectionTitle title="Job Description" className="mb-[10px] sm:mb-5" />
        <SectionReveal variants={moveUp(0.2)}>
          <div
            className="blog-detail-content"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </SectionReveal>
      </div>
    </section>
  );
}
