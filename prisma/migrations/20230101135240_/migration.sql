-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Perk" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "modifier" TEXT NOT NULL,

    CONSTRAINT "Perk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PerkToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Perk_modifier_key" ON "Perk"("modifier");

-- CreateIndex
CREATE UNIQUE INDEX "_PerkToUser_AB_unique" ON "_PerkToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PerkToUser_B_index" ON "_PerkToUser"("B");

-- AddForeignKey
ALTER TABLE "_PerkToUser" ADD CONSTRAINT "_PerkToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Perk"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PerkToUser" ADD CONSTRAINT "_PerkToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
