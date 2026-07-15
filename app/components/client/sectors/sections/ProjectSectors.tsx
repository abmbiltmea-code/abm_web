import Image from "next/image";
import { projectSectorsData } from "../data";
import SectionDescription from "../../animations/SectionDescription";
import SectionTitle from "../../animations/SectionTitle";
import CustomButton from "../../common/CustomButton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";


const ProjectSectors = () => {
  return (
    <section className="container">
      <div className="hidden lg:flex flex-col border-t border-border-color pb-[60px] md:pb-120 3xl:pb-150">
        {projectSectorsData.map((item, index) => {
          const isEven = index % 2 === 1;

          return (
            <div
              key={item.title}
              className={`flex flex-col lg:flex-row items-center justify-between pt-40 pb-80 last:pb-0 gap-y-30 gap-x-80 3xl:gap-x-[81px] ${
                index !== 0 ? "border-t border-border-color" : ""
              }`}
            >
              {/* Text content */}
              <div
                className={`flex flex-col w-full lg:w-[48%] 3xl:w-auto ${
                  isEven ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <SectionTitle title={item.title} className="mb-20" />
                <SectionDescription
                  text={item.description}
                  className="text-description-color mb-40"
                />
                <CustomButton text={item.btnText} href={item.btnLink} />
              </div>

              {/* Image */}
              <div
                className={`relative w-full lg:w-[52%] h-[280px] lg:h-[350px] xl:h-[400px] rounded-[10px] overflow-hidden 3xl:shrink-0 3xl:w-[850px] 3xl:h-[520px] ${
                  isEven ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="lg:hidden flex flex-col border-t border-border-color pb-[60px] md:pb-120 3xl:pb-150">

      </div>
    </section>
  );
};

export default ProjectSectors;
