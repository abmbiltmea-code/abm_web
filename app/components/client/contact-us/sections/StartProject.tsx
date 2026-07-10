import SectionDescription from "../../animations/SectionDescription";
import SectionTitle from "../../animations/SectionTitle";
import LetsConnectForm from "../sections/LetsConnectForm";

export default function StartProjectSection() {
  return (
    <section className="bg-cream-background py-100">
      <div className="container">
        <div className="flex justify-between gap-40 lg:gap-120 3xl:gap-140 items-start">
          <div className="max-w-[560px]">
            <SectionTitle title="Start Your Project With Us" className="mb-5" />
            <SectionDescription text="Fill out the form to send us a message." />
          </div>

          <div className="flex-1">
            <LetsConnectForm />
          </div>
        </div>
      </div>
    </section>
  );
}
