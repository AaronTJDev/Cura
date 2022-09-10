import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Name must be atleast 2 characters long')
    .max(50, 'Name cannot be greater than 50 characters long')
    .required('No name provided'),
  email: Yup.string().email('Invalid email provided').required(),
  password: Yup.string()
    .min(8, 'Password should be atleast 8 characters')
    .required('No password provided')
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email provided').required(),
  password: Yup.string().required('No password provided')
});

export const SearchSchema = Yup.object().shape({
  query: Yup.string()
    .required('A query must be provided to perform a search.')
    .max(50)
});
