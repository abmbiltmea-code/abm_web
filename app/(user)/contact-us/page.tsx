import Index from "@/app/components/client/contact-us/Index";
import { GetContactResult } from "@/app/types/contact";
import { getContact } from "@/lib/services/contact.service";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getContact();
  return buildMetadata(data.contact?.seo);
}

const page = async () => {
  const data: GetContactResult = await getContact();
  return (
    <>
      <Index data={data.contact} />
    </>
  );
};

export default page;
