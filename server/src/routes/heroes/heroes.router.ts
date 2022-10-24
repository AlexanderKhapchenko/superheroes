import { getHealth } from '@controllers/health/health.controller';
import { Router } from 'express';

const PATH = '/heroes';

const heroesRouter = Router();

// Show all, pagination

heroesRouter.get(`${PATH}`, getHealth);

export { heroesRouter };
