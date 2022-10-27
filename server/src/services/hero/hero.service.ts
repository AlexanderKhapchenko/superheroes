import { Prisma, Superhero } from '@prisma/client';

import prisma from '../../data/prisma-client';

const heroService = {
  getHeroes: async ({
    take,
    skip,
  }: Prisma.SuperheroFindManyArgs): Promise<Superhero[]> => {
    return await prisma.superhero.findMany({
      skip,
      take,
      include: {
        images: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  },
  count: async (): Promise<number> => {
    return await prisma.superhero.count();
  },
  getHero: async (id: string): Promise<Superhero | null> => {
    return await prisma.superhero.findUnique({
      where: {
        id,
      },
      include: {
        images: true,
      },
    });
  },

  createHero: async (data: Prisma.SuperheroCreateInput): Promise<Superhero> => {
    return await prisma.superhero.create({
      data,
      include: {
        images: true,
      },
    });
  },

  updateHero: async (
    id: string,
    data: Omit<Prisma.SuperheroUpdateInput, 'id'>,
  ): Promise<Superhero> => {
    return await prisma.superhero.update({
      where: {
        id,
      },
      data,
    });
  },

  deleteHero: async (id: string): Promise<Superhero> => {
    return await prisma.superhero.delete({
      where: {
        id,
      },
    });
  },
};

export { heroService };
