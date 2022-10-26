import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { theme } from '@common/theme/theme';
import { Routing } from '@components/navigation/routing/routing';
import { ThemeProvider } from '@mui/material';
import { store } from '@store/store';

import './styles/styles.scss';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Routing />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
