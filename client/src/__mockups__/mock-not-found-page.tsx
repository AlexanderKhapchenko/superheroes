import { BrowserRouter as Router } from 'react-router-dom';

import { NotFoundPage } from '@components/page';

export const MockNotFoundPage = (): JSX.Element => {
  return (
    <Router>
      <NotFoundPage />
    </Router>
  );
};
