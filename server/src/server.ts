import { ENV } from '@common/enums/enums';

import { app } from './app';

const port = ENV.APP.SERVER_PORT;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running at ${port}`);
});
