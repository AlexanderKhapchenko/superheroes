import { ChangeEvent } from 'react';
import { Control, FieldErrors } from 'react-hook-form';

export type InputFieldPropsType = {
  name: string;
  type?: string;
  rows?: number;
  min?: number;
  max?: number;
  errors?: FieldErrors;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
  autoComplete?: string;
  required?: boolean;
  control?: Control;
  inputLabel?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};
