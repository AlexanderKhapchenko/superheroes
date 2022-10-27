import { TypedRequestQuery } from '@common/types/controller/controller';
import { HttpError } from '@dtos/exceptions/error.dto';
import { NextFunction, Response } from 'express';
import httpStatus from 'http-status-codes';

const validateHeroesPaginationMiddleware = async (
  req: TypedRequestQuery<{ limit: string; page: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { limit, page } = req.query;
    validateNumber(limit);
    validateNumber(page);
    next();
  } catch (err) {
    next(new HttpError(err as Error, httpStatus.BAD_REQUEST));
  }
};

const validateNumber = (value: string): void => {
  const num = Number(value);

  if (isNaN(num)) throw new Error('Query params should be number');
  if (num <= 0) throw new Error('Query params should be more then zero');
};

export { validateHeroesPaginationMiddleware };
