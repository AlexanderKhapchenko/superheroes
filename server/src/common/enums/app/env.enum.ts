const { PORT, IMGUR_CLIENT_ID } = process.env;

const ENV = {
  APP: {
    SERVER_PORT: Number(PORT),
  },
  API: {
    V1_PREFIX: '/api/v1',
  },
  IMGUR: {
    CLIENT_ID: IMGUR_CLIENT_ID,
  },
};

export { ENV };
