import React, { useCallback } from 'react';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';

/** Helpers */
import { createUserWithEmailAndPassword } from '../../../redux/account/actions';
import { SignupSchema } from '../../../lib/validationSchemas';
import { navigate } from '../../../lib/helpers/navigation';

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
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => {
        console.log(handleChange, handleBlur, handleSubmit, values, errors);
        return <></>;
      }}
    </Formik>
  );
}
