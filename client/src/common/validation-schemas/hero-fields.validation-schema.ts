import * as Yup from 'yup';

const heroFieldsSchema = Yup.object().shape({
  nickname: Yup.string()
    .required('Nickname is required')
    .min(2, 'Nickname must be at least 2 characters')
    .max(150, 'Nickname must not exceed 150 characters')
    .matches(
      /^\s*([a-zA-Z]+\s)*[a-zA-Z]*\s*$/,
      'Nickname must contain only latin characters',
    )
    .trim(),
  real_name: Yup.string()
    .required('Real name is required')
    .min(2, 'Real name must be at least 2 characters')
    .max(150, 'Real name must not exceed 150 characters')
    .trim(),
  origin_description: Yup.string()
    .required('Origin description is required')
    .min(2, 'Origin description must be at least 2 characters')
    .max(150, 'Origin description must not exceed 150 characters')
    .trim(),
  superpowers: Yup.string()
    .min(2, 'Superpower must be at least 2 characters')
    .max(150, 'Superpower must not exceed 150 characters')
    .required('Origin description is required')
    .trim(),
  catch_phrase: Yup.string()
    .min(2, 'Catch phrase must be at least 2 characters')
    .max(150, 'Catch phrase must not exceed 150 characters')
    .trim()
    .required('Catch phrase is required'),
});

export { heroFieldsSchema };
