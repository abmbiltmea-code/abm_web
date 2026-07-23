import InnerCta from "../common/InnerCta";
import Main from "./sections/Main";
import { GetNewsResult } from "@/app/types/news";

const Index = ({ data }: { data: GetNewsResult["detail"] }) => {
  return (
    <>
      <Main data={data} />
      <InnerCta data={data.cta} email />
    </>
  );
};

export default Index;
