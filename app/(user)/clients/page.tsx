import Index from "@/app/components/client/partners/Index";
import { GetClientsResult } from "@/app/types/clients";
import { getClients } from "@/lib/services/clients.service";

const page = async () => {
  const data: GetClientsResult = await getClients();
  return (
    <>
      <Index data={data.clients} />
    </>
  );
};

export default page;
