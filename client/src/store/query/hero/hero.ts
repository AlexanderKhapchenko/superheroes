import { ApiPath, HttpMethod, QueryTag } from '@common/enums';
import { Superhero, Superheroes } from '@common/types';

import { api } from '../api';

interface GetHeroesParams {
  limit: number;
  page: number;
}

const heroApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getHeroes: builder.query<Superheroes, GetHeroesParams>({
      query: ({ page, limit }) => ({
        url: ApiPath.HERO,
        method: HttpMethod.GET,
        params: {
          page,
          limit,
        },
      }),
      providesTags: [QueryTag.HEROES],
    }),
    getHero: builder.query<Superhero, string>({
      query: (id) => ({
        url: `${ApiPath.HERO}/${id}`,
        method: HttpMethod.GET,
      }),
      providesTags: [QueryTag.HERO],
    }),
    createHero: builder.mutation<Superhero, FormData>({
      query: (body) => ({
        url: ApiPath.HERO,
        method: HttpMethod.POST,
        body,
      }),
      invalidatesTags: [QueryTag.HEROES],
    }),
    updateHero: builder.mutation<Superhero, { body: FormData; id: string }>({
      query: ({ id, body }) => ({
        url: `${ApiPath.HERO}/${id}`,
        method: HttpMethod.PATCH,
        body: body,
      }),
      invalidatesTags: [QueryTag.HERO, QueryTag.HEROES],
    }),
    deleteHero: builder.mutation<Superhero, string>({
      query: (id) => ({
        url: `${ApiPath.HERO}/${id}`,
        method: HttpMethod.DELETE,
      }),
      invalidatesTags: [QueryTag.HEROES],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetHeroesQuery,
  useGetHeroQuery,
  useCreateHeroMutation,
  useUpdateHeroMutation,
  useDeleteHeroMutation,
} = heroApi;
