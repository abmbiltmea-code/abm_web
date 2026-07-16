import SectionTitle from "../../animations/SectionTitle";
import SectionDescription from "../../animations/SectionDescription";

const TeamHeader = ({title, description}: {title: string, description: string}) => {
  return (
    <section className="container pt-[29px] md:pt-90 pb-[40px]">
      <div className="flex flex-col gap-5">
        <SectionTitle title={title} />
        <SectionDescription
          text={description}
          className="text-description-color text-description-2 max-w-[90%] 3xl:max-w-[1283px]"
        />
      </div>
    </section>
  );
};

export default TeamHeader;
