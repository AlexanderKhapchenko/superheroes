import React, { useState } from 'react';

import { Image } from '@common/types';
import { Button, ImageListItem, ImageListItemBar } from '@mui/material';
import clsx from 'clsx';

import styles from './styles.module.scss';

interface HeroImageProps {
  image: Image;
  onDelete: () => void;
  onRestore: () => void;
}

const HeroImage: React.FC<HeroImageProps> = ({
  image,
  onDelete,
  onRestore,
}) => {
  const [isDelete, setIsDelete] = useState(false);

  const onClickDelete = (): void => {
    if (!isDelete) onDelete();
    else onRestore();

    setIsDelete(!isDelete);
  };

  return (
    <ImageListItem className={styles.imageItem}>
      <img
        src={image.url}
        alt={image.id}
        loading="lazy"
        className={clsx(styles.image, {
          [styles.deleted]: isDelete,
        })}
      />
      <ImageListItemBar
        sx={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
            'rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)',
          paddingLeft: '10px',
          paddingTop: '10px',
          paddingBottom: '30px',
        }}
        position="top"
        actionIcon={
          <Button
            onClick={onClickDelete}
            variant="outlined"
            className={styles.button}
          >
            {!isDelete ? 'Remove' : 'Cancel remove'}
          </Button>
        }
        actionPosition="left"
      />
    </ImageListItem>
  );
};

export { HeroImage };
