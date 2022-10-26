/*
  Warnings:

  - You are about to drop the column `images` on the `Superhero` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Superhero" DROP COLUMN "images";

-- CreateTable
CREATE TABLE "Images" (
    "id" TEXT NOT NULL,
    "hero_id" TEXT NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_hero_id_fkey" FOREIGN KEY ("hero_id") REFERENCES "Superhero"("id") ON DELETE CASCADE ON UPDATE CASCADE;
