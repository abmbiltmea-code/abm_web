import Index from "@/app/components/client/projects/Index";
import { GetProjectsResult } from "@/app/types/project";
import { getProjects } from "@/lib/services/project.service";

const page = async () => {
  const data: GetProjectsResult = await getProjects();
  return (
    <>
      <Index data={data} />
    </>
  );
};

export default page;
