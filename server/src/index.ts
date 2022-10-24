import { ENV } from '@common/enums/enums';
import { healthRouter, heroRouter, heroesRouter } from '@routes/routes';
import express from 'express';

const app = express();

const routes = [healthRouter, heroRouter, heroesRouter];
routes.forEach((route) => app.use(ENV.API.V1_PREFIX, route));

const port = ENV.APP.SERVER_PORT;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running at ${port}`);
});
