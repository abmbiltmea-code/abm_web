import CustomButton from "@/app/components/client/common/CustomButton";
import { openPositionsData } from "../data";
import Link from "next/link";
import SectionTitle from "../../animations/SectionTitle";

export default function OpenPositions() {
  const { title, talentNetwork, jobs } = openPositionsData;

  return (
    <section className="container py-[60px] md:py-120 3xl:py-150">
      <div className="flex flex-col lg:flex-row gap-40 lg:gap-100 3xl:gap-[125px]">
        {/* Left */}
        <div className="w-full lg:max-w-[40%] 3xl:max-w-[580px] shrink-0">
          <SectionTitle title={title} className="mb-50" />

          <div className="bg-cream-background px-[15px] py-5 sm:p-30 rounded-[10px]">
            <h3 className="text-subtitle-2 mb-[10px] uppercase">
              {talentNetwork.title}
            </h3>
            <p className="text-description-color text-description-2 mb-[15px] sm:mb-5 3xl:mb-[23px] max-w-[45ch]">
              {talentNetwork.description}
            </p>
            <div className="relative flex items-center w-full p-[15px] sm:p-20 max-h-[47px] sm:max-h-max">
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(227, 30, 38, 0.2) 0%, rgba(227, 30, 38, 0.02) 100%)",
                }}
              />

              <Link
                href={`mailto:${talentNetwork.email}`}
                className="relative z-10 text-primary text-20 font-medium leading-[1.416666] md:leading-normal font-tasa pb-px border-b border-primary"
              >
                {talentNetwork.email}
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Job list */}
        <div className="w-full lg:w-[70%]">
          <div className="sm:border-t border-border-color space-y-5 sm:space-y-0">
            {jobs.map((job) => (
              <div
                key={job.title}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-[15px] sm:px-0 py-5 sm:py-50 border rounded-[10px] sm:rounded-none sm:border-0 sm:border-b border-border-color"
              >
                <div>
                  <span className="block text-description-color text-description-2 mb-[15px] sm:mb-[10px]">
                    {job.category}
                  </span>
                  <h3 className="text-secondary text-subtitle-2 uppercase mb-[15px] sm:mb-[10px]">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-40 3xl:gap-[42px]">
                    <span className="flex items-center gap-[5px] sm:gap-[10px] text-description-color text-description-2">
                      <span className="w-[7px] h-[7px] bg-primary" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-[5px] sm:gap-[10px] text-description-color text-description-2">
                      <span className="w-[7px] h-[7px] bg-primary" />
                      {job.type}
                    </span>
                    <span className="flex items-center gap-[5px] sm:gap-[10px] text-description-color text-description-2">
                      <span className="w-[7px] h-[7px] bg-primary" />
                      {job.experience}
                    </span>
                  </div>
                </div>

                <div className="mt-[30px] sm:mt-0 flex items-stretch gap-10 shrink-0">
                  <CustomButton
                    href={`/careers/${job.title.toLowerCase().replace(" ", "-")}`}
                    text="Apply Now"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
