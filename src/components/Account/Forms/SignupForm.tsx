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
import { createUserWithEmailAndPassword } from '../../../redux/account/actions';
import { SignupSchema } from '../../../lib/validationSchemas';
import { navigate } from '../../../lib/helpers/navigation';

const styles = StyleSheet.create({});

interface SignupFormValues {
  email: string;
  password: string;
  username: string;
}

export default function SignupForm() {
  const dispatch = useDispatch();
  const initialValues = {
    email: '',
    password: '',
    username: ''
  };

  const handleCreateAccount = useCallback(
    async (values: SignupFormValues, { setFieldError, resetForm }: any) => {
      const { email, password } = values;
      try {
        await createUserWithEmailAndPassword(dispatch, email, password);
        resetForm();
        navigate('Symptom Search');
      } catch (err) {
        setFieldError('email', 'Email already in use');
        throw err;
      }
    },
    [dispatch]
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleCreateAccount}
      validationSchema={SignupSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => <></>}
    </Formik>
  );
}
