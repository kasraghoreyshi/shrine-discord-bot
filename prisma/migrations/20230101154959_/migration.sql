/*
  Warnings:

  - A unique constraint covering the columns `[apiId]` on the table `Perk` will be added. If there are existing duplicate values, this will fail.
  - Made the column `apiId` on table `Perk` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Perk" ALTER COLUMN "apiId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Perk_apiId_key" ON "Perk"("apiId");
