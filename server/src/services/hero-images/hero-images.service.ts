import { prisma } from '@data/prisma-client';
import { Image, Prisma } from '@prisma/client';

const heroImagesService = {
  createImages: async (
    data: Prisma.ImageCreateManyInput[],
  ): Promise<Prisma.BatchPayload> => {
    return await prisma.image.createMany({
      data,
    });
  },
  deleteImages: async (
    idsToDelete: Array<string>,
  ): Promise<Prisma.BatchPayload> => {
    return await prisma.image.deleteMany({
      where: {
        id: {
          in: idsToDelete,
        },
      },
    });
  },
  getImages: async (heroId: string): Promise<Image[]> => {
    return await prisma.image.findMany({
      where: {
        hero_id: heroId,
      },
    });
  },
  getImagesById: async (ids: Array<string>): Promise<Image[]> => {
    return await prisma.image.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  },
};

export { heroImagesService };
