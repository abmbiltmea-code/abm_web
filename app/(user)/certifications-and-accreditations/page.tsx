import Index from "@/app/components/client/certifications/Index";
import { getCertifications } from "@/lib/services/certifications.service";
import { GetCertificationsResult } from "@/app/types/certifications";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getCertifications();
  return buildMetadata(data.certifications?.seo);
}

const page = async () => {
  const data: GetCertificationsResult = await getCertifications();
  return (
    <>
      <Index data={data.certifications} />
    </>
  );
};

export default page;
