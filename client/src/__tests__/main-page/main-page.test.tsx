import 'whatwg-fetch';
import React from 'react';

import { mockHeroes, MockMainPage } from '@__mockups__/mockups';
import { ENV } from '@common/enums';
import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const fiveHero = mockHeroes.slice(0, 5);

const server = setupServer(
  rest.get(`${ENV.API_PATH}/hero`, async (req, res, ctx) => {
    req.url.searchParams.get('limit');
    req.url.searchParams.get('page');

    return res(
      ctx.json({
        'countOfHeroes': 5,
        'heroes': fiveHero,
      }),
    );
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Main Page test', async () => {
  test('should contain five hero', async () => {
    render(<MockMainPage />);

    const heroElements = await screen.findAllByTestId('hero-item');

    expect(heroElements.length).toEqual(5);
  });
  test('should contain properly five hero nicknames', async () => {
    render(<MockMainPage />);

    const heroNicknamesPromises = [];
    for (let i = 0; i < 5; i++) {
      heroNicknamesPromises.push(screen.findByText(fiveHero[i].nickname));
    }
    const heroNicknamesElements = await Promise.all(heroNicknamesPromises);

    heroNicknamesElements.forEach((heroNicknameElement) => {
      expect(heroNicknameElement).toBeInTheDocument();
    });
  });
  test('should hide pagination if hero count less then 6', async () => {
    render(<MockMainPage />);

    const paginationElements = await screen.findAllByTestId('pagination');

    paginationElements.forEach((paginationElement) => {
      const hiddenAttribute = paginationElement.getAttribute('hidden');
      expect(hiddenAttribute).not.toBe(null);
    });
  });
});
