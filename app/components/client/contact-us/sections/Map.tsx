import Image from "next/image";

const Map = () => {
  return (
    <section className="container py-[60px] md:py-120 3xl:py-150">
      <div className="rounded-[10px] overflow-hidden">
        <Image
          src="/assets/images/contact-us/map.jpg"
          alt="map"
          width={3500}
          height={1600}
          className="w-full min-h-[366px] h-auto object-cover max-[787px]"
        />
      </div>
    </section>
  );
};

export default Map;
