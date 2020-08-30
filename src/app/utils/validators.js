import * as yup from 'yup';

export const loginValidator = yup.object().shape({
  email: yup
    .string()
    .required('Must not be empty')
    .email('Must be a valid email address'),
  password: yup.string().required('Must not be empty'),
});

export const registerValidator = yup.object().shape({
  email: yup
    .string()
    .required('Must not be empty')
    .email('Must be a valid email address'),
  username: yup.string().required('Must not be empty'),
  password: yup
    .string()
    .required('Must not be empty')
    .min(6, 'Must at least 6 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password must match'),
});

export const eventValidator = yup.object().shape({
  title: yup.string().required('Must not be empty'),
  category: yup.string().required('Must not be empty'),
  description: yup.string().required('Must not be empty'),
  city: yup.string().required('Must not be empty'),
  venue: yup.string().required('Must not be empty'),
  date: yup.string().required('Must not be empty'),
});

export const resetPasswordValidator = yup.object().shape({
  password: yup
    .string()
    .required('Must not be empty')
    .min(6, 'Password must at least 6 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password does not matches.'),
});

export const profileFormValidator = yup.object().shape({
  username: yup.string().required('Must not be empty'),
});

export const eventChatCommentValidator = yup.object().shape({
  text: yup.string().required(),
});
