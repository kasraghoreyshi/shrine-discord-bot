import { Prisma } from "@prisma/client";
import { prisma } from "../../db";
import { ApiPerk } from "../../helpers/api";

export const upsertPerks = async (perks: ApiPerk) => {
  for (const key in perks) {
    if (Object.prototype.hasOwnProperty.call(perks, key)) {
      const { modifier, name, description, tunables } = perks[key];
      const createUpdate: Prisma.PerkUpsertArgs["create"] = {
        modifier,
        name,
        description,
        tunables,
        apiId: key,
      };
      await prisma.perk.upsert({
        create: createUpdate,
        update: createUpdate,
        where: { modifier },
      });
    }
  }
};
