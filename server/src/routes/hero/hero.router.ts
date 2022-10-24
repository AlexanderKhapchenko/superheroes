import { getHealth } from '@controllers/health/health.controller';
import { Router } from 'express';

const PATH = '/hero';

const heroRouter = Router();

// Create, edit and remove

heroRouter.get(`${PATH}`, getHealth);

export { heroRouter };
