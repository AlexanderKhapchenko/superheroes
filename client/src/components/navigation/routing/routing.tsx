import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppRoute } from '@common/enums/app/app-route.enum';
import {
  CreateHeroPage,
  EditHeroPage,
  HeroPage,
  MainPage,
  NotFoundPage,
} from '@components/page';

const Routing: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.ROOT} element={<MainPage />}></Route>
        <Route path={AppRoute.HERO} element={<HeroPage />}></Route>
        <Route path={AppRoute.CREATE} element={<CreateHeroPage />}></Route>
        <Route path={AppRoute.EDIT} element={<EditHeroPage />}></Route>
        <Route path={AppRoute.NOT_FOUND} element={<NotFoundPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export { Routing };
