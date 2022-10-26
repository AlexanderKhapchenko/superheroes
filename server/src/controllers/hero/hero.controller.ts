import {
  TypedRequestFields,
  TypedRequestParams,
  TypedRequestQuery,
} from '@common/types/controller/controller';
import { UpdateHeroReq } from '@common/types/hero/hero';
import { HttpError } from '@dtos/exceptions/error.dto';
import { Superhero, Image } from '@prisma/client';
import { heroImagesService } from '@services/hero-images/hero-images.service';
import { heroService } from '@services/hero/hero.service';
import { imageService } from '@services/image/image.service';
import { imgurService } from '@services/imgur/imgur.service';
import { NextFunction, Response } from 'express';
import httpStatus from 'http-status-codes';

const heroController = {
  getHeroes: async (
    req: TypedRequestQuery<{ limit: string; page: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { limit, page } = req.query;
      const take = Number(limit);
      const skip = (Number(page) - 1) * take;

      const heroes = await heroService.getHeroes({
        take,
        skip,
      });

      const countOfHeroes = await heroService.count();
      res
        .json({
          countOfHeroes,
          heroes,
        })
        .status(httpStatus.OK);
    } catch (error) {
      next(error);
    }
  },
  getHero: async (
    req: TypedRequestParams<{ id: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const hero = await heroService.getHero(req.params.id);
      res.json(hero).status(httpStatus.OK);
    } catch (error) {
      next(new HttpError(error as Error, httpStatus.NOT_FOUND));
    }
  },

  createHero: async (
    req: TypedRequestFields<Omit<Superhero, 'id'>>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = await heroService.createHero(req.body);

      const image = req.files?.image;
      if (image) {
        const uploadedImages = await imageService.uploadImages(id, image);
        await heroImagesService.createImages(uploadedImages);
      }

      const createdHero = await heroService.getHero(id);
      res.json(createdHero).status(httpStatus.CREATED);
    } catch (error) {
      next(error);
    }
  },

  updateHero: async (
    req: UpdateHeroReq,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { ids, ...updatedHeroFields } = req.body;
      await heroService.updateHero(req.params.id, updatedHeroFields);

      if (ids) {
        const imageIdsToDelete = JSON.parse(ids) as string[];
        await imageService.deleteImages(imageIdsToDelete);
        await heroImagesService.deleteImages(imageIdsToDelete);
      }

      if (req.files?.image) {
        const uploadedImages = await imageService.uploadImages(
          req.params.id,
          req.files.image,
        );
        await heroImagesService.createImages(uploadedImages);
      }

      const updatedHero = await heroService.getHero(req.params.id);

      res.json(updatedHero).status(httpStatus.OK);
    } catch (error) {
      next(error);
    }
  },

  deleteHero: async (
    req: TypedRequestParams<{ id: string }>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const images = await heroImagesService.getImages(req.params.id);
      const idsToDelete = images.flatMap(
        (image: Image) => image.delete_hash || [],
      );

      idsToDelete && (await imgurService.deleteImages(idsToDelete));

      const deletedHero = await heroService.deleteHero(req.params.id);
      res.json(deletedHero).status(httpStatus.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  },
};

export { heroController };
