import { ENV } from '@common/enums/enums';
import { errorsHandler } from '@middleware/exceptions/exceptions.middleware';
import { healthRouter, heroRouter } from '@routes/routes';
import cors from 'cors';
import express from 'express';

const app = express();
app.use(cors()).use(express.json());

const routes = [healthRouter, heroRouter];
routes.forEach((route) => app.use(ENV.API.V1_PREFIX, route));

app.use(errorsHandler);

export { app };
