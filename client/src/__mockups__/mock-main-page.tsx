import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { MainPage } from '@components/page';
import { store } from '@store/store';

export const MockMainPage = (): JSX.Element => {
  return (
    <Provider store={store}>
      <Router>
        <MainPage />
      </Router>
    </Provider>
  );
};
