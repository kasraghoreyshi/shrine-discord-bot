/*
  Warnings:

  - You are about to drop the column `reminded` on the `Shrine` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Shrine" DROP COLUMN "reminded";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "shrineId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_shrineId_fkey" FOREIGN KEY ("shrineId") REFERENCES "Shrine"("id") ON DELETE SET NULL ON UPDATE CASCADE;
