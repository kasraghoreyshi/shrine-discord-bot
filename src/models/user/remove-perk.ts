import { prisma } from "../../db";
import { upsertUser } from "./upsert";

export const removePerk = async (
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
    data: { perks: { disconnect: { id: perkId } } },
  });
};
