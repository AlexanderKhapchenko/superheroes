import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { CreateHeroPage } from '@components/page';
import { store } from '@store/store';

export const MockCreateHeroPage: React.FC = (): JSX.Element => {
  return (
    <Provider store={store}>
      <Router>
        <CreateHeroPage />
      </Router>
    </Provider>
  );
};
