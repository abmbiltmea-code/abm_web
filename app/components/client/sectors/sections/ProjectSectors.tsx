import Image from "next/image";
import { projectSectorsData } from "../data";
import SectionDescription from "../../animations/SectionDescription";
import SectionTitle from "../../animations/SectionTitle";
import CustomButton from "../../common/CustomButton";

const ProjectSectors = () => {
  return (
    <section className="container">
      <div className="flex flex-col border-t border-border-color">
        {projectSectorsData.map((item, index) => {
          const isEven = index % 2 === 1;

          return (
            <div
              key={item.title}
              className={`flex flex-col lg:flex-row  items-center justify-between pt-40 pb-80 gap-y-30 gap-x-80 3xl:gap-x-[81px] ${
                index !== 0 ? "border-t border-border-color" : ""
              }`}
            >
              {/* Text content */}
              <div
                className={`flex flex-col gap-20 ${
                  isEven ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <SectionTitle title={item.title} />
                <SectionDescription
                  text={item.description}
                  className="text-description-color"
                />
                <CustomButton text={item.btnText} href={item.btnLink} />
              </div>

              {/* Image */}
              <div
                className={`relative w-full h-[280px] lg:h-[400px] 3xl:h-[520px] rounded-[10px] max-w-[50%] 3xl:max-w-[850px] overflow-hidden ${
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
    </section>
  );
};

export default ProjectSectors;
