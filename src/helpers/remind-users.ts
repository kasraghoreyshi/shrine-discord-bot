import { Perk, Shrine } from "@prisma/client";
import { prisma } from "../db";

export const remindUsers = async ({
  perks,
  apiId,
}: Shrine & { perks: Perk[] }) => {
  const result: { userDiscordId: string; message: string }[] = [];
  const shrine = await prisma.shrine.findFirst({ where: { apiId } });
  if (shrine.reminded) return [];
  for (const perk of perks) {
    const users = await prisma.user.findMany({
      where: { perks: { some: { id: perk.id } } },
    });
    for (const user of users) {
      result.push({
        userDiscordId: user.discordId,
        message: `${perk.name} just appeared on the shrine!`,
      });
    }
  }
  await prisma.shrine.update({
    where: { id: shrine.id },
    data: { reminded: true },
  });
  return result;
};
