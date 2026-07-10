import SectionTitle from "../animations/SectionTitle";
import CustomButton from "./CustomButton";

type Props = {
  title: string;
  maxTitleWidth?: string;
  btnText: string;
  btnLink: string;
};

const InnerCtaSecondary = ({
  title,
  maxTitleWidth,
  btnText,
  btnLink,
}: Props) => {
  return (
    <div className="py-100 3xl:py-[105px] bg-secondary rounded-[10px]">
      <div className="flex flex-col gap-40 px-100">
        <SectionTitle title={title} className={`${maxTitleWidth} text-white`} />
        <CustomButton text={btnText} href={btnLink} />
      </div>
    </div>
  );
};

export default InnerCtaSecondary;
