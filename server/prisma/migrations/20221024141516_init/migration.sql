-- CreateTable
CREATE TABLE "Superhero" (
    "id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "real_name" TEXT NOT NULL,
    "origin_description" TEXT NOT NULL,
    "superpowers" TEXT[],
    "catch_phrase" TEXT NOT NULL,
    "images" TEXT[],

    CONSTRAINT "Superhero_pkey" PRIMARY KEY ("id")
);
