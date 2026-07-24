import CareerDetails from "./sections/CareerDetails";
import CareerHeader from "./sections/CareerHeader";
import { JobDoc } from "@/app/types/careers";

const Index = ({ data }: { data: JobDoc }) => {
  return (
    <>
      <CareerHeader data={data} />
      <CareerDetails data={data} />
    </>
  );
};

export default Index;
