import * as path from 'path';

import { describe, expect, test } from '@jest/globals';
import request from 'supertest';

import { heroes } from '../../../../prisma/seeds/heroes';
import { images } from '../../../../prisma/seeds/images';
import { app } from '../../../app';
import { imgurMock } from '../../imgur-mock';
import { prismaMock } from '../../prisma-mock';

describe('Test hero api', () => {
  const mockHero = heroes[0];
  const mockImage = images[0];

  const expectedHero = {
    ...mockHero,
    createdAt: mockHero.createdAt.toISOString(),
    updatedAt: mockHero.updatedAt.toISOString(),
  };

  describe('[POST] /hero', () => {
    test('The POST method without image  should return an valid response', async () => {
      prismaMock.superhero.create.mockResolvedValue(mockHero);
      prismaMock.superhero.findUnique.mockResolvedValue(mockHero);

      const response = await request(app)
        .post('/api/v1/hero')
        .field('nickname', mockHero.nickname)
        .field('real_name', mockHero.real_name)
        .field('origin_description', mockHero.origin_description)
        .field('superpowers', mockHero.superpowers)
        .field('catch_phrase', mockHero.catch_phrase);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toEqual(expectedHero);
    });
    test('The POST method with image  should return an valid response', async () => {
      const heroWithImage = { ...mockHero, images: [mockImage] };
      const expectedHeroWithImage = { ...expectedHero, images: [mockImage] };

      prismaMock.superhero.create.mockResolvedValue(mockHero);
      prismaMock.superhero.findUnique.mockResolvedValue(heroWithImage);
      prismaMock.image.createMany.mockResolvedValue({ count: 1 });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      imgurMock.upload.mockResolvedValue({
        data: {
          link: 'mockImage.url',
          deletehash: 'mockImage.delete_hash',
        },
      } as unknown);

      const response = await request(app)
        .post('/api/v1/hero')
        .field('nickname', mockHero.nickname)
        .field('real_name', mockHero.real_name)
        .field('origin_description', mockHero.origin_description)
        .field('superpowers', mockHero.superpowers)
        .field('catch_phrase', mockHero.catch_phrase)
        .attach('image', path.resolve(__dirname, 'images', 'image.png'));

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toEqual(expectedHeroWithImage);
    });
    test('Nickname should contain only latin characters', async () => {
      const response = await request(app)
        .post('/api/v1/hero')
        .field('nickname', 'Not valid nickname!')
        .field('real_name', mockHero.real_name)
        .field('origin_description', mockHero.origin_description)
        .field('superpowers', mockHero.superpowers)
        .field('catch_phrase', mockHero.catch_phrase);

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        message: 'Nickname must contain only latin characters',
      });
    });

    test('Nickname should be at least 2 characters', async () => {
      const response = await request(app)
        .post('/api/v1/hero')
        .field('nickname', 'a')
        .field('real_name', mockHero.real_name)
        .field('origin_description', mockHero.origin_description)
        .field('superpowers', mockHero.superpowers)
        .field('catch_phrase', mockHero.catch_phrase);

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        message: 'Nickname must be at least 2 characters',
      });
    });
    test('Real name should be at least 2 characters', async () => {
      const response = await request(app)
        .post('/api/v1/hero')
        .field('nickname', mockHero.nickname)
        .field('real_name', 'a')
        .field('origin_description', mockHero.origin_description)
        .field('superpowers', mockHero.superpowers)
        .field('catch_phrase', mockHero.catch_phrase);

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        message: 'Real name must be at least 2 characters',
      });
    });
    test('Origin description should be at least 2 characters', async () => {
      const response = await request(app)
        .post('/api/v1/hero')
        .field('nickname', mockHero.nickname)
        .field('real_name', mockHero.real_name)
        .field('origin_description', 'a')
        .field('superpowers', mockHero.superpowers)
        .field('catch_phrase', mockHero.catch_phrase);

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        message: 'Origin description must be at least 2 characters',
      });
    });
    test('Superpowers should be at least 2 characters', async () => {
      const response = await request(app)
        .post('/api/v1/hero')
        .field('nickname', mockHero.nickname)
        .field('real_name', mockHero.real_name)
        .field('origin_description', mockHero.origin_description)
        .field('superpowers', 'a')
        .field('catch_phrase', mockHero.catch_phrase);

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        message: 'Superpowers must be at least 2 characters',
      });
    });
    test('Catch phrase should be at least 2 characters', async () => {
      const response = await request(app)
        .post('/api/v1/hero')
        .field('nickname', mockHero.nickname)
        .field('real_name', mockHero.real_name)
        .field('origin_description', mockHero.origin_description)
        .field('superpowers', mockHero.superpowers)
        .field('catch_phrase', 'a');

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        message: 'Catch phrase must be at least 2 characters',
      });
    });

    test('Nickname should not exceed 150 characters', async () => {
      const response = await request(app)
        .post('/api/v1/hero')
        .field(
          'nickname',
          'qweasdasdjhewrjhsdjkfhsfnhmcsadkjfhoaisfxmhodsaasdasjkdhasjkdghasjdgasjhdgajhdgqhdebqjhwebajkdhjaksdhkjadhakjsdhqwehqwekjdadhkjhasdkjahsdoiuqhedadnlkaa',
        )
        .field('real_name', mockHero.real_name)
        .field('origin_description', mockHero.origin_description)
        .field('superpowers', mockHero.superpowers)
        .field('catch_phrase', mockHero.catch_phrase);

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        message: 'Nickname must not exceed 150 characters',
      });
    });
    test('Real name should not exceed 150 characters', async () => {
      const response = await request(app)
        .post('/api/v1/hero')
        .field('nickname', mockHero.nickname)
        .field(
          'real_name',
          'qweasdasdjhewrjhsdjkfhsfnhmcsadkjfhoaisfxmhodsaasdasjkdhasjkdghasjdgasjhdgajhdgqhdebqjhwebajkdhjaksdhkjadhakjsdhqwehqwekjdadhkjhasdkjahsdoiuqhedadnlkaa',
        )
        .field('origin_description', mockHero.origin_description)
        .field('superpowers', mockHero.superpowers)
        .field('catch_phrase', mockHero.catch_phrase);

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        message: 'Real name must not exceed 150 characters',
      });
    });
    test('Origin description should not exceed 150 characters', async () => {
      const response = await request(app)
        .post('/api/v1/hero')
        .field('nickname', mockHero.nickname)
        .field('real_name', mockHero.real_name)
        .field(
          'origin_description',
          'qweasdasdjhewrjhsdjkfhsfnhmcsadkjfhoaisfxmhodsaasdasjkdhasjkdghasjdgasjhdgajhdgqhdebqjhwebajkdhjaksdhkjadhakjsdhqwehqwekjdadhkjhasdkjahsdoiuqhedadnlkaa',
        )
        .field('superpowers', mockHero.superpowers)
        .field('catch_phrase', mockHero.catch_phrase);

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        message: 'Origin description must not exceed 150 characters',
      });
    });
    test('Superpowers should not exceed 150 characters', async () => {
      const response = await request(app)
        .post('/api/v1/hero')
        .field('nickname', mockHero.nickname)
        .field('real_name', mockHero.real_name)
        .field('origin_description', mockHero.origin_description)
        .field(
          'superpowers',
          'qweasdasdjhewrjhsdjkfhsfnhmcsadkjfhoaisfxmhodsaasdasjkdhasjkdghasjdgasjhdgajhdgqhdebqjhwebajkdhjaksdhkjadhakjsdhqwehqwekjdadhkjhasdkjahsdoiuqhedadnlkaa',
        )
        .field('catch_phrase', mockHero.catch_phrase);

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        message: 'Superpowers must not exceed 150 characters',
      });
    });
    test('Catch phrase should not exceed 150 characters', async () => {
      const response = await request(app)
        .post('/api/v1/hero')
        .field('nickname', mockHero.nickname)
        .field('real_name', mockHero.real_name)
        .field('origin_description', mockHero.origin_description)
        .field('superpowers', mockHero.superpowers)
        .field(
          'catch_phrase',
          'qweasdasdjhewrjhsdjkfhsfnhmcsadkjfhoaisfxmhodsaasdasjkdhasjkdghasjdgasjhdgajhdgqhdebqjhwebajkdhjaksdhkjadhakjsdhqwehqwekjdadhkjhasdkjahsdoiuqhedadnlkaa',
        );

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        message: 'Catch phrase must not exceed 150 characters',
      });
    });

    test('Picture should be valid format', async () => {
      const response = await request(app)
        .post('/api/v1/hero')
        .field('nickname', mockHero.nickname)
        .field('real_name', mockHero.real_name)
        .field('origin_description', mockHero.origin_description)
        .field('superpowers', mockHero.superpowers)
        .field('catch_phrase', mockHero.catch_phrase)
        .attach('image', path.resolve(__dirname, 'images', 'bad-type.svg'));

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        message: 'This is not an Image File!',
      });
    });
    test('Picture should be less than 10mb ', async () => {
      const response = await request(app)
        .post('/api/v1/hero')
        .field('nickname', mockHero.nickname)
        .field('real_name', mockHero.real_name)
        .field('origin_description', mockHero.origin_description)
        .field('superpowers', mockHero.superpowers)
        .field('catch_phrase', mockHero.catch_phrase)
        .attach('image', path.resolve(__dirname, 'images', 'big-size.jpg'));

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        message: 'File too Big, please select a file less than 10mb',
      });
    });
  });

  test('The GET one hero method should return the response 200 and superhero', async () => {
    prismaMock.superhero.findUnique.mockResolvedValue(mockHero);

    const response = await request(app).get('/api/v1/hero/some-id');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expectedHero);
  });
  test('The GET all hero method should return the response 200 and 5 superheroes', async () => {
    const fiveHeroes = heroes.slice(0, 5);

    const expectedHeroes = fiveHeroes.map((hero) => ({
      ...hero,
      createdAt: hero.createdAt.toISOString(),
      updatedAt: hero.updatedAt.toISOString(),
    }));

    prismaMock.superhero.findMany.mockResolvedValue(fiveHeroes);
    prismaMock.superhero.count.mockResolvedValue(fiveHeroes.length);

    const response = await request(app).get('/api/v1/hero?limit=5&page=1');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      countOfHeroes: fiveHeroes.length,
      heroes: expectedHeroes,
    });
  });
  test('The PATCH method should return the response 200 and superhero', async () => {
    prismaMock.superhero.update.mockResolvedValue(mockHero);
    prismaMock.superhero.findUnique.mockResolvedValue(mockHero);

    const response = await request(app)
      .patch('/api/v1/hero/some-id')
      .field('nickname', mockHero.nickname)
      .field('real_name', mockHero.real_name)
      .field('origin_description', mockHero.origin_description)
      .field('superpowers', mockHero.superpowers)
      .field('catch_phrase', mockHero.catch_phrase);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toEqual(expectedHero);
  });
});
