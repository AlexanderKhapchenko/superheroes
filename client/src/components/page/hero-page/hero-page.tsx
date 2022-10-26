import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AppRoute } from '@common/enums/app/app-route.enum';
import { Spinner, TextField } from '@components/common';
import {
  Button,
  Container,
  ImageList,
  ImageListItem,
  Typography,
} from '@mui/material';
import { useGetHeroQuery } from '@store/query/hero/hero';

const HeroPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetHeroQuery(id as string);

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{'data' in error && error.data.message}</h1>;
  if (!data || !id) return <h1>Not found hero</h1>;

  const imagesRows = Math.ceil(data.images.length / 3);
  const height = imagesRows * 300 + (imagesRows - 1) * 15;

  return (
    <Container sx={{ marginY: 10 }} maxWidth={'md'}>
      <TextField label="Nickname" text={data.nickname} />
      <TextField label="Real name" text={data.real_name} />
      <TextField label="Catch phrase" text={data.catch_phrase} />
      <TextField label="Description" text={data.origin_description} />
      <TextField label="Superpowers" text={data.superpowers} />
      <Typography variant="h4" color="primary.main">
        Superhero`s images
      </Typography>
      <ImageList
        sx={{ width: '100%', height }}
        cols={3}
        gap={15}
        rowHeight={300}
      >
        {data.images.map((image) => (
          <ImageListItem key={image.id}>
            <img src={`${image.url}`} alt={image.id} loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList>
      <Button variant="contained" onClick={(): void => navigate(AppRoute.ROOT)}>
        Close
      </Button>
    </Container>
  );
};

export { HeroPage };
