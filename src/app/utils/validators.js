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
