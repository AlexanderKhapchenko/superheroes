import {
  TypedRequest,
  TypedRequestParams,
} from '@common/types/controller/controller';
import { heroFieldsSchema } from '@common/validation-schemas/hero-fields.validation-schema';
import { heroImageSchema } from '@common/validation-schemas/hero-image.validation-schema';
import { HttpError } from '@dtos/exceptions/error.dto';
import { Superhero } from '@prisma/client';
import { heroService } from '@services/hero/hero.service';
import { NextFunction, Response, Request } from 'express';
import { Files } from 'formidable';
import httpStatus from 'http-status-codes';

const addBodyFromFieldsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  req.body = req.fields;
  next();
};

const validateHeroFieldsMiddleware = async (
  req: TypedRequest<{ id: string }, Omit<Superhero, 'id'>>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await heroFieldsSchema.validate(req.body);
    req.files && (await validateFiles(req.files));

    next();
  } catch (err) {
    next(new HttpError(err as Error, httpStatus.BAD_REQUEST));
  }
};

const validateHeroExistMiddleware = async (
  req: TypedRequestParams<{ id: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.params.id) throw new Error('Id in params is required');
    const hero = await heroService.getHero(req.params.id);

    if (!hero) throw new Error('Hero with that id not found');

    next();
  } catch (err) {
    next(new HttpError(err as Error, httpStatus.NOT_FOUND));
  }
};

const validateFiles = async (files: Files): Promise<void> => {
  if ('image' in files) {
    if (Array.isArray(files.image)) {
      const validatePromises = files.image.map(
        async (img) => await heroImageSchema.validate(img),
      );
      await Promise.all(validatePromises);
    } else {
      await heroImageSchema.validate(files.image);
    }
  }
};

export {
  validateHeroFieldsMiddleware,
  validateHeroExistMiddleware,
  addBodyFromFieldsMiddleware,
};
