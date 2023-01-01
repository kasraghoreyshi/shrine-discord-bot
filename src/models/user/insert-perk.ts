import { prisma } from "../../db";
import { upsertUser } from "./upsert";

export const insertPerk = async (
  discordId: string,
  username: string,
  perkId: number
) => {
  const user = await upsertUser({
    create: { discordId, username },
    update: { username },
    where: { discordId },
  });
  return prisma.user.update({
    where: { id: user.id },
    data: { perks: { connect: { id: perkId } } },
  });
};
