import { PrismaClient } from '@prisma/client';

import { heroes } from './seeds/heroes';
import { images } from './seeds/images';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  for (const hero of heroes) {
    await prisma.superhero.create({
      data: hero,
    });
  }

  for (const image of images) {
    await prisma.image.create({
      data: image,
    });
  }
}

main().catch((e): void => {
  // eslint-disable-next-line no-console
  console.log(e);
});
