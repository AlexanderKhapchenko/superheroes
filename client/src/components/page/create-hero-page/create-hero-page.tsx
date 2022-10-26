import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { ImageListType } from 'react-images-uploading';
import { useNavigate } from 'react-router-dom';

import { AppRoute } from '@common/enums/app/app-route.enum';
import { Superhero } from '@common/types';
import { HeroForm } from '@components/common';
import { Alert, Container, Snackbar, Typography } from '@mui/material';
import { useCreateHeroMutation } from '@store/query/hero/hero';

const CreateHeroPage: React.FC = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<ImageListType>([]);
  const [createHero, { isLoading, isSuccess, error }] = useCreateHeroMutation();

  const onSubmit: SubmitHandler<Omit<Superhero, 'images'>> = async (data) => {
    const formData = new FormData();

    images &&
      images.forEach((image) => {
        formData.append('image', image.file as File, image.file?.name);
      });

    Object.entries(data).forEach(([key, value]) => formData.append(key, value));

    await createHero(formData);
  };

  return (
    <Container sx={{ marginY: 10 }} maxWidth={'md'}>
      <Typography variant="h2" gutterBottom>
        Create Hero
      </Typography>
      <HeroForm
        onSubmit={onSubmit}
        images={images}
        setImages={setImages}
        isLoading={isLoading}
        error={error}
        submitBtnText="Create"
        maxNumberOfImages={10}
      />
      <Snackbar
        open={isSuccess}
        autoHideDuration={3000}
        onClose={(): void => navigate(AppRoute.ROOT)}
      >
        <Alert
          onClose={(): void => navigate(AppRoute.ROOT)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Hero created
        </Alert>
      </Snackbar>
    </Container>
  );
};

export { CreateHeroPage };
