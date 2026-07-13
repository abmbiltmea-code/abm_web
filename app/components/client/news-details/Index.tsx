import InnerCta from "../common/InnerCta";
import Main from "./sections/Main";
import { ctaData } from "./data";

const Index = () => {
  return (
    <>
      <Main />
      <InnerCta {...ctaData} email />
    </>
  );
};

export default Index;
