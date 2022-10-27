import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { HeroPage } from '@components/page';
import { store } from '@store/store';

export const MockHeroPage: React.FC<{ id: string }> = ({ id }): JSX.Element => {
  return (
    <Provider store={store}>
      <Router>
        <HeroPage heroID={id} />
      </Router>
    </Provider>
  );
};
