import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ENV } from '@common/enums';
import { AppRoute } from '@common/enums/app/app-route.enum';
import { HeroItem } from '@components/common';
import { Spinner } from '@components/common/spinner/spinner';
import { Button, Pagination } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { useGetHeroesQuery } from '@store/query/hero/hero';

const HeroList: React.FC = () => {
  const navigate = useNavigate();
  const limit = ENV.HEROES_LIMIT;

  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useGetHeroesQuery({
    limit,
    page,
  });

  const handleChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ): void => {
    setPage(value);
  };

  if (isLoading || !data) return <Spinner />;
  if (isError) return <h1>{'data' in error && error.data.message}</h1>;

  const lastPage = Math.ceil(data.countOfHeroes / limit);

  return (
    <>
      <Button
        variant="contained"
        onClick={(): void => navigate(AppRoute.CREATE)}
        sx={{ marginBottom: 3 }}
      >
        Create Hero
      </Button>
      <Pagination
        count={lastPage}
        page={page}
        onChange={handleChange}
        hidden={data.countOfHeroes < 6}
        data-testid="pagination"
      />
      <Grid2 container rowSpacing={4} justifyContent={'space-around'}>
        {data.heroes.map((hero) => {
          return (
            <Grid2 key={hero.id} data-testid={'hero-item'}>
              <HeroItem {...hero} />
            </Grid2>
          );
        })}
      </Grid2>
      <Pagination
        count={lastPage}
        page={page}
        onChange={handleChange}
        hidden={data.countOfHeroes < 6}
        data-testid="pagination"
      />
    </>
  );
};

export { HeroList };
