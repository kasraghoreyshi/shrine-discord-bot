-- AlterTable
ALTER TABLE "Perk" ADD COLUMN     "apiId" TEXT;

-- CreateTable
CREATE TABLE "Shrine" (
    "id" SERIAL NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "reminded" BOOLEAN,

    CONSTRAINT "Shrine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PerkToShrine" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PerkToShrine_AB_unique" ON "_PerkToShrine"("A", "B");

-- CreateIndex
CREATE INDEX "_PerkToShrine_B_index" ON "_PerkToShrine"("B");

-- AddForeignKey
ALTER TABLE "_PerkToShrine" ADD CONSTRAINT "_PerkToShrine_A_fkey" FOREIGN KEY ("A") REFERENCES "Perk"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PerkToShrine" ADD CONSTRAINT "_PerkToShrine_B_fkey" FOREIGN KEY ("B") REFERENCES "Shrine"("id") ON DELETE CASCADE ON UPDATE CASCADE;
