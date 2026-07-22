import Index from "@/app/components/client/leadership/Index";
import { GetTeamResult } from "@/app/types/team";
import { getTeam } from "@/lib/services/team.service";

const page = async () => {
  const data: GetTeamResult = await getTeam();
  return (
    <>
      <Index data={data.team} />
    </>
  );
};

export default page;
