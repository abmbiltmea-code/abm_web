import HeroSlider from "./sections/HeroSlider";
import AboutSection from "./sections/AboutUs";
import CoreCapabilities from "./sections/Capabilities";
import Sectors from "./sections/Sectors";
import WhyAbm from "./sections/WhyAbm";
import OurProjects from "./sections/OurProjects";
import Clients from "./sections/Clients";
import ContactSection from "./sections/ContactSection";
import { GetHomeResult } from "@/app/types/home";

const Index = ({ data }: { data: GetHomeResult }) => {
  return (
    <>
      <HeroSlider data={data.home.firstSection} />
      <AboutSection data={data.home.secondSection} />
      <CoreCapabilities />
      <Sectors />
      <WhyAbm data={data.home.fifthSection} />
      <OurProjects />
      <Clients />
      <ContactSection />
    </>
  );
};

export default Index;
