import { HttpError } from '@dtos/exceptions/error.dto';
import httpStatus from 'http-status-codes';

import type { NextFunction, Request, Response } from 'express';

export const errorsHandler = (
  error: Error | HttpError,
  req: Request,
  res: Response,
  _: NextFunction,
): void => {
  if (error instanceof HttpError) {
    res.status(error.code).json({ message: error.message });
    return;
  }

  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    error,
    message: error.message,
  });
  return;
};
