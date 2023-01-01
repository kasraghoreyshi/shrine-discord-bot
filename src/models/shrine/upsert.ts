import { Prisma } from "@prisma/client";
import { prisma } from "../../db";
import { ApiShrine } from "../../helpers/api";

export const upsertShrine = async ({ id, perks, start, end }: ApiShrine) => {
  const createUpdate: Prisma.ShrineUpsertArgs["create"] = {
    apiId: id,
    start: new Date(start * 1000),
    end: new Date(end * 1000),
    perks: { connect: perks.map((perk) => ({ apiId: perk.id })) },
  };
  return prisma.shrine.upsert({
    create: createUpdate,
    update: createUpdate,
    where: { apiId: id },
    include: { perks: true },
  });
};
