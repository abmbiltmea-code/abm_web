import Index from "@/app/components/client/leadership/Index";
import { GetTeamResult } from "@/app/types/team";
import { getTeam } from "@/lib/services/team.service";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getTeam();
  return buildMetadata(data.team?.seo);
}

const page = async () => {
  const data: GetTeamResult = await getTeam();
  return (
    <>
      <Index data={data.team} />
    </>
  );
};

export default page;
