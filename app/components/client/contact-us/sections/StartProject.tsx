import SectionDescription from "../../animations/SectionDescription";
import SectionReveal from "../../animations/SectionReveal";
import SectionTitle from "../../animations/SectionTitle";
import { moveUp } from "../../animations/motionVariants";
import LetsConnectForm from "../sections/LetsConnectForm";

export default function StartProjectSection() {
  return (
    <section id="join-us" className="bg-cream-background py-120">
      <div className="container">
        <SectionReveal variants={moveUp(0.1)}>
          <div className="flex flex-col lg:flex-row justify-between gap-40 lg:gap-100 xl:gap-120 3xl:gap-140 items-start">
            <div className="w-full lg:w-[40%] 3xl:max-w-[560px]">
              <SectionTitle
                title="Start Your Project With Us"
                className="mb-[30px] lg:mb-5"
              />
              <SectionDescription
                className="text-description-color"
                text="Fill out the form to send us a message."
              />
            </div>

            <div className="w-full lg:flex-1">
              <LetsConnectForm />
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
