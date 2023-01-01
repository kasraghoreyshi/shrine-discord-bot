/*
  Warnings:

  - A unique constraint covering the columns `[apiId]` on the table `Shrine` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `apiId` to the `Shrine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shrine" ADD COLUMN     "apiId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Shrine_apiId_key" ON "Shrine"("apiId");
