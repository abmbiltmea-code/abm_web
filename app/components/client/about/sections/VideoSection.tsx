import Image from "next/image";

export default function VideoSection() {
  return (
    <section className="relative w-full aspect-video max-h-[700px] 3xl:max-h-[800px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/assets/images/about/video-bg.jpg"
        alt="Video thumbnail"
        fill
        className="object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          className="group w-[100px] h-[100px] rounded-full bg-white flex items-center justify-center cursor-pointer"
          aria-label="Play video"
        >
          <Image
            src="/assets/icons/play-primary.svg"
            alt="Play"
            width={14}
            height={19}
            className="group-hover:scale-130 transition-transform duration-500"
          />
        </button>
      </div>
    </section>
  );
}
