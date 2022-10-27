import 'whatwg-fetch';
import React from 'react';

import { mockHeroes, MockHeroPage } from '@__mockups__/mockups';
import { ENV } from '@common/enums';
import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const [oneHero] = mockHeroes;
const server = setupServer(
  rest.get(`${ENV.API_PATH}/hero/hero-id`, async (req, res, ctx) => {
    return res(ctx.json(oneHero));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Hero Page test', async () => {
  test('should contain all text fields of hero', async () => {
    render(<MockHeroPage id={'hero-id'} />);

    const nickname = await screen.findByText(oneHero.nickname);
    const real_name = await screen.findByText(oneHero.real_name);
    const catch_phrase = await screen.findByText(oneHero.catch_phrase);
    const origin_description = await screen.findByText(
      oneHero.origin_description,
    );

    expect(nickname).toBeInTheDocument();
    expect(real_name).toBeInTheDocument();
    expect(catch_phrase).toBeInTheDocument();
    expect(origin_description).toBeInTheDocument();
  });
  test('should contain all images', async () => {
    render(<MockHeroPage id={'hero-id'} />);

    const images = await screen.findAllByTestId('hero-image');

    expect(images.length).toEqual(2);
  });
});
