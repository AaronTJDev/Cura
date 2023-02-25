import React, { useCallback } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';

/** Helpers */
import { colors, fonts } from '../../../lib/styles';
import { login } from '../../../redux/account/actions';
import { LoginSchema } from '../../../lib/validationSchemas';
import { navigate } from '../../../lib/helpers/navigation';

const styles = StyleSheet.create({});

interface LoginFormValues {
  email: string;
  password: string;
}

export default function SignupForm() {
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
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => <></>}
    </Formik>
  );
}
