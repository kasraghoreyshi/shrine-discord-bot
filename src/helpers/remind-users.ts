import { Perk, Shrine } from "@prisma/client";
import { prisma } from "../db";

export const remindUsers = async ({
  perks,
  apiId,
}: Shrine & { perks: Perk[] }) => {
  const result: { userDiscordId: string; message: string }[] = [];
  for (const perk of perks) {
    const users = await prisma.user.findMany({
      where: { perks: { some: { id: perk.id } } },
      include: { lastRemindedShrine: true },
    });
    for (const user of users) {
      if (user.lastRemindedShrine?.apiId === apiId) continue;
      result.push({
        userDiscordId: user.discordId,
        message: `${perk.name} just appeared on the shrine!`,
      });
      await prisma.user.update({
        where: { discordId: user.discordId },
        data: { lastRemindedShrine: { connect: { apiId } } },
      });
    }
  }
  return result;
};
