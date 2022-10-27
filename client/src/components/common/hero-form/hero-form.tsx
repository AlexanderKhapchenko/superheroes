import React, { ReactElement } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { ImageListType } from 'react-images-uploading';
import { useNavigate } from 'react-router-dom';

import { AppRoute } from '@common/enums/app/app-route.enum';
import { Superhero } from '@common/types';
import { heroFieldsSchema } from '@common/validation-schemas/hero-fields.validation-schema';
import { ImageUpload, Spinner } from '@components/common';
import { InputField } from '@components/common/input-field/input-field';
import { useAppForm } from '@hooks/app-form/app-form.hook';
import { Alert, Box, Button, Stack, Typography } from '@mui/material';
import { SerializedError } from '@reduxjs/toolkit';
import { ErrorType } from '@store/query/api';

import styles from './styles.module.scss';

interface HeroFormProps {
  onSubmit: SubmitHandler<Omit<Superhero, 'images'>>;
  images: ImageListType;
  setImages: (images: ImageListType) => void;
  isLoading: boolean;
  error: ErrorType | SerializedError | undefined;
  superhero?: Superhero;
  imageField?: ReactElement;
  submitBtnText: string;
  maxNumberOfImages: number;
}

const HeroForm: React.FC<HeroFormProps> = ({
  onSubmit,
  images,
  setImages,
  isLoading,
  error,
  superhero,
  imageField,
  submitBtnText,
  maxNumberOfImages,
}) => {
  const navigate = useNavigate();

  const onChange = (imageList: ImageListType): void => {
    setImages(imageList);
  };

  const { control, errors, handleSubmit } = useAppForm<
    Omit<Superhero, 'images'>
  >({
    defaultValues: {
      nickname: superhero?.nickname || '',
      real_name: superhero?.real_name || '',
      origin_description: superhero?.origin_description || '',
      superpowers: superhero?.superpowers || '',
      catch_phrase: superhero?.catch_phrase || '',
    },
    validationSchema: heroFieldsSchema,
  });

  if (isLoading) return <Spinner />;

  return (
    <form name="form" onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <fieldset disabled={isLoading} className={styles.fieldset}>
        <InputField
          name="nickname"
          required={true}
          errors={errors}
          control={control}
          inputLabel="Nickname"
        />
        <InputField
          name="real_name"
          required={true}
          errors={errors}
          control={control}
          inputLabel="Real name"
        />
        <InputField
          name="origin_description"
          required={true}
          errors={errors}
          control={control}
          inputLabel="Origin Description"
        />
        <InputField
          name="superpowers"
          required={true}
          errors={errors}
          control={control}
          inputLabel="Superpowers"
        />
        <InputField
          name="catch_phrase"
          required={true}
          errors={errors}
          control={control}
          inputLabel="Catch phrase"
        />
        <Typography gutterBottom variant="h4" component="div">
          Superhero images
        </Typography>
        {Boolean(superhero?.images?.length) && imageField}
        <ImageUpload
          images={images}
          onChange={onChange}
          maxNumberOfImages={maxNumberOfImages}
        />
        <Box className={styles.btnContainer}>
          <Button
            type="submit"
            variant="contained"
            sx={{ marginRight: '10px' }}
            role="submit-button"
          >
            {submitBtnText}
          </Button>
          <Button
            variant="outlined"
            onClick={(): void => navigate(AppRoute.ROOT)}
          >
            Cancel
          </Button>
        </Box>
        <Stack sx={{ width: '100%' }} spacing={2}>
          {error && 'data' in error && (
            <Alert severity="error">{error.data.message}</Alert>
          )}
        </Stack>
      </fieldset>
    </form>
  );
};

export { HeroForm };
