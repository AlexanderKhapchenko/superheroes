import { Superhero } from '@prisma/client';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

interface UpdateHeroBody extends Omit<Superhero, 'id'> {
  ids?: string;
}

interface HeroParams extends ParamsDictionary {
  id: string;
}

interface UpdateHeroReq extends Request {
  body: UpdateHeroBody;
  params: HeroParams;
}

export type { UpdateHeroReq };
