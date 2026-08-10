import Index from "@/app/components/client/projects/Index";
import { GetProjectsResult } from "@/app/types/project";
import { getProjects } from "@/lib/services/project.service";

// const page = async () => {
//   const data: GetProjectsResult = await getProjects();
//   return (
//     <>
//       <Index data={data} />
//     </>
//   );
// };

// export default page;

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  await searchParams;
  const data: GetProjectsResult = await getProjects();
  return <Index data={data} />;
};

export default page;
