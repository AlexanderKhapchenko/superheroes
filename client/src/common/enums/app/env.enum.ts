const { VITE_SUPERHEROES_API, VITE_HEROES_LIMIT } = import.meta.env;

const ENV = {
  API_PATH: VITE_SUPERHEROES_API,
  HEROES_LIMIT: VITE_HEROES_LIMIT,
};

export { ENV };