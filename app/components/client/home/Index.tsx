import HeroSlider from "./sections/HeroSlider";
import AboutSection from "./sections/AboutUs";
import CoreCapabilities from "./sections/Capabilities";
import Sectors from "./sections/Sectors";
import WhyAbm from "./sections/WhyAbm";
import OurProjects from "./sections/OurProjects";
import Clients from "./sections/Clients";
import ContactSection from "./sections/ContactSection";

const Index = () => {
  return (
    <>
      <HeroSlider />
      <AboutSection />
      <CoreCapabilities />
      <Sectors />
      <WhyAbm />
      <OurProjects />
      <Clients />
      <ContactSection />
    </>
  );
};

export default Index;
