import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { ImageListType } from 'react-images-uploading';
import { useParams } from 'react-router-dom';

import { Superhero } from '@common/types';
import { HeroForm, HeroImages } from '@components/common';
import { Container, Typography } from '@mui/material';
import { useGetHeroQuery, useUpdateHeroMutation } from '@store/query/hero/hero';

const EditHeroPage: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading: getHeroIsLoading } = useGetHeroQuery(id as string);

  const [images, setImages] = useState<ImageListType>([]);
  const [deletedImages, setDeletedImages] = useState<Array<string>>([]);
  const [updateHero, { isLoading: updateHeroIsLoading, error }] =
    useUpdateHeroMutation();

  const onDelete = (imageId: string): void => {
    setDeletedImages([...deletedImages, imageId]);
  };

  const onRestore = (imageId: string): void => {
    const index = deletedImages.findIndex((id) => id === imageId);

    if (index < 0) return;

    const newDeletedImages = [
      ...deletedImages.slice(0, index),
      ...deletedImages.slice(index + 1),
    ];
    setDeletedImages(newDeletedImages);
  };

  const onSubmit: SubmitHandler<Omit<Superhero, 'images'>> = async (data) => {
    const formData = new FormData();

    images &&
      images.forEach((image) => {
        formData.append('image', image.file as File, image.file?.name);
      });

    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    deletedImages.length &&
      formData.append('ids', JSON.stringify(deletedImages));
    await updateHero({ id: id as string, body: formData });

    setImages([]);
  };

  if (!data || !id) return <h1>Not found hero</h1>;

  return (
    <Container sx={{ marginY: 10 }} maxWidth={'md'}>
      <Typography variant="h2" gutterBottom>
        Edit Hero
      </Typography>
      <HeroForm
        onSubmit={onSubmit}
        images={images}
        setImages={setImages}
        isLoading={updateHeroIsLoading || getHeroIsLoading}
        error={error}
        superhero={data}
        submitBtnText="Update hero"
        imageField={
          <HeroImages
            images={data.images}
            onDelete={onDelete}
            onRestore={onRestore}
          />
        }
        maxNumberOfImages={10 - (data.images?.length ? data.images.length : 0)}
      />
    </Container>
  );
};

export { EditHeroPage };
