const { PORT } = process.env;

const ENV = {
    APP: {
        SERVER_PORT: Number(PORT)
    },
    API: {
        V1_PREFIX: '/api/v1',
    }
}

export { ENV };
