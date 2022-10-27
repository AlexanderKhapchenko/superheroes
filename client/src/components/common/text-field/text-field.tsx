import React from 'react';

import { Box, Typography } from '@mui/material';

import styles from './styles.module.scss';

interface TextFieldProps {
  label: string;
  text: string;
}

const TextField: React.FC<TextFieldProps> = ({ label, text }) => {
  return (
    <Box className={styles.box}>
      <Typography variant="h5" color="primary.main">
        {label}
      </Typography>
      <Typography variant="h6">{text}</Typography>
    </Box>
  );
};

export { TextField };
