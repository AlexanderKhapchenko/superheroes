import { QueryTag, ENV } from '@common/enums';
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

export type ErrorType = {
  data: {
    message: string;
  };
  status: number;
};

const baseQuery = fetchBaseQuery({
  baseUrl: ENV.API_PATH,
}) as BaseQueryFn<string | FetchArgs, unknown, ErrorType>;

const api = createApi({
  reducerPath: 'heroes',
  baseQuery,
  endpoints: () => ({}),
  tagTypes: [QueryTag.HERO, QueryTag.HEROES],
});

export { api };
