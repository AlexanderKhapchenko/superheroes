import { ENV } from '@common/enums/app';
import { ImgurClient } from 'imgur';

const client = new ImgurClient({ clientId: ENV.IMGUR.CLIENT_ID });

// eslint-disable-next-line import/no-default-export
export default client;
