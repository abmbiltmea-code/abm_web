import Index from "@/app/components/client/partners/Index";
import { GetClientsResult } from "@/app/types/clients";
import { getClients } from "@/lib/services/clients.service";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getClients();
  return buildMetadata(data.clients?.seo);
}

const page = async () => {
  const data: GetClientsResult = await getClients();
  return (
    <>
      <Index data={data.clients} />
    </>
  );
};

export default page;
