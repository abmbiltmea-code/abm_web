import Index from "@/app/components/client/contact-us/Index";
import { GetContactResult } from "@/app/types/contact";
import { getContact } from "@/lib/services/contact.service";

const page = async () => {
  const data: GetContactResult = await getContact();
  return (
    <>
      <Index data={data.contact} />
    </>
  );
};

export default page;
