import { heroController } from '@controllers/hero/hero.controller';
import {
  addBodyFromFieldsMiddleware,
  validateHeroExistMiddleware,
  validateHeroFieldsMiddleware,
} from '@middleware/hero/hero.middleware';
import { validateHeroesPaginationMiddleware } from '@middleware/heroes/heroes.middleware';
import { Router } from 'express';
import formidableMiddleware from 'express-formidable';

const PATH = '/hero';

const heroRouter = Router();

heroRouter.get(
  `${PATH}`,
  validateHeroesPaginationMiddleware,
  heroController.getHeroes,
);

heroRouter.get(
  `${PATH}/:id`,
  validateHeroExistMiddleware,
  heroController.getHero,
);
heroRouter.post(
  `${PATH}`,
  formidableMiddleware({ multiples: true }),
  addBodyFromFieldsMiddleware,
  validateHeroFieldsMiddleware,
  heroController.createHero,
);
heroRouter.patch(
  `${PATH}/:id`,
  formidableMiddleware({ multiples: true }),
  validateHeroExistMiddleware,
  addBodyFromFieldsMiddleware,
  validateHeroFieldsMiddleware,
  heroController.updateHero,
);

heroRouter.delete(`${PATH}/:id`, heroController.deleteHero);

export { heroRouter };
