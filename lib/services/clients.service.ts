import connectDB from "@/lib/mongodb";
import ClientsModel from "@/app/models/Clients";
import { unstable_cache } from "next/cache";
import type { GetClientsResult } from "@/app/types/clients";

export const getClients = unstable_cache(
  async (): Promise<GetClientsResult> => {
    await connectDB();

    const clients = await ClientsModel.findOne({}).lean();

    if (!clients) throw new Error("Clients page not found");

    return JSON.parse(JSON.stringify({ clients }));
  },
  ["Clients"],
  { tags: ["Clients"] },
);