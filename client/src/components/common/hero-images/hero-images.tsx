import React from 'react';

import { Image } from '@common/types';
import { HeroImage } from '@components/common';
import { ImageList, Typography } from '@mui/material';

interface HeroImagesProps {
  images?: Array<Image>;
  onDelete: (image: string) => void;
  onRestore: (image: string) => void;
}

const HeroImages: React.FC<HeroImagesProps> = ({
  images,
  onDelete,
  onRestore,
}) => {
  if (!images) return <Typography variant="h3">No images</Typography>;

  const imagesRows = Math.ceil(images.length / 3);
  const height = imagesRows * 300 + (imagesRows - 1) * 15;

  return (
    <ImageList sx={{ width: '100%', height }} cols={3} rowHeight={300} gap={15}>
      {images.map((image) => {
        return (
          <HeroImage
            key={image.id}
            image={image}
            onDelete={(): void => onDelete(image.id)}
            onRestore={(): void => onRestore(image.id)}
          />
        );
      })}
    </ImageList>
  );
};

export { HeroImages };
