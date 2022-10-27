import React from 'react';

import { HeroList } from '@components/common';
import { Container } from '@mui/material';

const MainPage: React.FC = () => {
  return (
    <Container maxWidth={'md'} sx={{ marginY: 10 }}>
      <HeroList />
    </Container>
  );
};

export { MainPage };
