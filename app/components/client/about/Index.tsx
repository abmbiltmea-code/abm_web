import InnerBanner from "../common/InnerBanner"
import { bannerData } from "./data"
import AboutSection from "./sections/AboutSection"

const Index = () => {
  return (
    <>
    <InnerBanner {...bannerData} />
    <AboutSection />
    </>
  )
}

export default Index