import Image from "next/image";
import CustomButton from "../../common/CustomButton";
import SectionTitle from "../../animations/SectionTitle";

interface FeaturedNewsProps {
  image: string;
  title: string;
  category: string;
  date: string;
}

export default function FeaturedNews({
  image,
  title,
  category,
  date,
}: FeaturedNewsProps) {
  return (
    <div className="container pb-40">
      <div className="flex flex-col items-center justify-between gap-60 3xl:gap-[68px] lg:flex-row border-b border-border-color pb-50">
        {/* Left: image */}
        <div className="relative aspect-5/3 w-full overflow-hidden rounded-[10px] 3xl:h-[523px] 3xl:w-[850px] 3xl:shrink-0">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>
        {/* Right: content */}
        <div className="flex w-full flex-col items-start">
          <div className="rounded-[10px] border border-border-color px-5 py-1 bg-cream-background text-description-2 text-description-color mb-40">
            Featured News
          </div>
          <SectionTitle title={title} className="mb-30" />
          <p className="text-description-2 text-description-color mb-40 flex items-center">
            {category}{" "}
            <span className="inline-block h-[18px] w-px bg-description-color mx-3" />{" "}
            {date}
          </p>
          <CustomButton text="Read News" href="#" />
        </div>
      </div>
    </div>
  );
}
