import { FileValidationRule } from '@common/enums/enums';
import * as Yup from 'yup';

const heroImageSchema = Yup.object().shape({
  type: Yup.string()
    .oneOf(FileValidationRule.TYPE, 'This is not an Image File!')
    .required(),
  size: Yup.number()
    .max(
      FileValidationRule.MAX_SIZE,
      'File too Big, please select a file less than 10mb',
    )
    .required(),
});

export { heroImageSchema };
