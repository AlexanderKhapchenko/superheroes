/*
  Warnings:

  - Added the required column `delete_hash` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "delete_hash" TEXT NULL;
