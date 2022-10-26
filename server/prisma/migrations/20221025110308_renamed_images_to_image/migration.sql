/*
  Warnings:

  - You are about to drop the `Images` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_hero_id_fkey";

-- DropTable
DROP TABLE "Images";

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "hero_id" TEXT NOT NULL,
    "url" VARCHAR(300) NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_hero_id_fkey" FOREIGN KEY ("hero_id") REFERENCES "Superhero"("id") ON DELETE CASCADE ON UPDATE CASCADE;
