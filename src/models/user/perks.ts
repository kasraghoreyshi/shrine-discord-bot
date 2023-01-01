import { prisma } from "../../db";

export const getUserPerks = async (discordId: string) => {
  return prisma.perk.findMany({ where: { users: { some: { discordId } } } });
};
