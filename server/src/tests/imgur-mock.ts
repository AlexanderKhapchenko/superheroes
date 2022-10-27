import { ImgurClient } from 'imgur';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';

import client from '../services/imgur/imgur-client';

jest.mock('../services/imgur/imgur-client', () => ({
  __esModule: true,
  default: mockDeep<ImgurClient>(),
}));

beforeEach(() => {
  mockReset(imgurMock);
});

export const imgurMock = client as unknown as DeepMockProxy<ImgurClient>;
