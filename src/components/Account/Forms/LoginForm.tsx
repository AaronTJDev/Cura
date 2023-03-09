import React, { useCallback } from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';

/** Helpers */
import { login } from '../../../redux/account/actions';
import { LoginSchema } from '../../../lib/validationSchemas';
import { navigate } from '../../../lib/helpers/navigation';

interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const dispatch = useDispatch();
  const initialValues = {
    email: '',
    password: ''
  };

  const handleLogin = useCallback(
    async (values: LoginFormValues, { setFieldError, resetForm }: any) => {
      const { email, password } = values;
      try {
        await login(dispatch, email, password);
        resetForm();
        navigate('Symptom Search');
      } catch (err) {
        console.log('err', err);
        setFieldError('email', 'Email or password is incorrect');
        throw err;
      }
    },
    [dispatch]
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleLogin}
      validationSchema={LoginSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
        console.log(handleChange, handleBlur, handleSubmit, values, errors);
        return <></>;
      }}
    </Formik>
  );
};
