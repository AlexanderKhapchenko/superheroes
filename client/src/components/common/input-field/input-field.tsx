import React from 'react';
import { useController } from 'react-hook-form';

import { InputFieldPropsType } from '@common/types';
import { ErrorMessage } from '@hookform/error-message';
import { TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { clsx } from 'clsx';

// import { PhoneMask } from './input-masks/phone-mask/phone-mask';
import styles from './styles.module.scss';

const InputField: React.FC<InputFieldPropsType> = ({
  name,
  control,
  type,
  errors,
  inputLabel,
  value,
  onChange,
  autoComplete,
}) => {
  const {
    field: { ...field },
  } = control
    ? useController({ name, control })
    : { field: { onChange, value } };
  return (
    <FormControl
      variant="standard"
      className={clsx(
        styles.inputField,
        styles.fieldWrapper,
        errors?.[name] && styles.inputFieldError,
      )}
    >
      <TextField
        {...field}
        id="outlined-basic"
        label={inputLabel}
        variant="outlined"
        type={type}
        error={!!errors?.[name]}
        autoComplete={autoComplete}
      />
      {errors?.[name] && (
        <FormHelperText className={styles.error}>
          <span>
            <ErrorMessage errors={errors} name={name} />
          </span>
        </FormHelperText>
      )}
    </FormControl>
  );
};

InputField.defaultProps = {
  type: 'text',
  required: false,
};

export { InputField };
