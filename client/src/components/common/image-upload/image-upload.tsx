import React, { ReactNode } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';

import { FileValidationRule } from '@common/enums';
import { Alert, Button, Typography } from '@mui/material';
import { clsx } from 'clsx';

import styles from './styles.module.scss';

interface ImageUploadProps {
  images: ImageListType;
  maxNumberOfImages?: number;
  onChange: (value: ImageListType, addUpdatedIndex?: number[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  images,
  maxNumberOfImages,
  onChange,
}) => {
  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={maxNumberOfImages}
      dataURLKey="data_url"
      acceptType={FileValidationRule.TYPE.map((type) =>
        type.replace('image/', ''),
      )}
      maxFileSize={FileValidationRule.MAX_SIZE}
    >
      {({
        imageList,
        onImageUpload,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
        errors,
      }): ReactNode => (
        <div>
          <div
            {...dragProps}
            className={clsx(styles.dropField, {
              [styles.active]: isDragging,
            })}
          >
            <Typography>
              {isDragging ? 'Drop here please' : 'Upload space'}
            </Typography>
          </div>
          <Button
            variant="outlined"
            onClick={onImageUpload}
            className={styles.button}
          >
            Click here
          </Button>
          {imageList.map((image, index) => (
            <div key={index} className={styles.uploadedImage}>
              <img src={image['data_url']} alt={`image${index}`} />
              <div className={styles.btnGroup}>
                <Button
                  variant="outlined"
                  onClick={(): void => onImageUpdate(index)}
                >
                  Change
                </Button>
                <Button
                  variant="outlined"
                  onClick={(): void => onImageRemove(index)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
          {errors && (
            <div>
              {errors.maxNumber && (
                <Alert severity="error">
                  Number of selected images exceed maxNumber
                </Alert>
              )}
              {errors.acceptType && (
                <Alert severity="error">
                  Your selected file type is not allow
                </Alert>
              )}
              {errors.maxFileSize && (
                <Alert severity="error">
                  Selected file size exceed maxFileSize
                </Alert>
              )}
            </div>
          )}
        </div>
      )}
    </ImageUploading>
  );
};

export { ImageUpload };
