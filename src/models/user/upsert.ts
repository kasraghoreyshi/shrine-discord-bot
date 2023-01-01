import { Prisma } from "@prisma/client";
import { prisma } from "../../db";

export const upsertUser = async (args: Prisma.UserUpsertArgs) => {
  return prisma.user.upsert(args);
};
