import Index from "@/app/components/client/certifications/Index";
import { getCertifications } from "@/lib/services/certifications.service";
import { GetCertificationsResult } from "@/app/types/certifications";

const page = async () => {
  const data: GetCertificationsResult = await getCertifications();
  return (
    <>
      <Index data={data.certifications} />
    </>
  );
};

export default page;
