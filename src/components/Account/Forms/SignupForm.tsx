import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';

/** Components */
import { SocialCta } from './SocialCta';

/** Helpers */
import { createUserWithEmailAndPassword } from '../../../redux/account/actions';
import { SignupSchema } from '../../../lib/validationSchemas';
import { TextFormField } from './TextFormField';
import { IndexableObject } from '../../../lib/types/forms';
import { colors, fonts } from '../../../lib/styles';
import { assetResolver } from '../../../lib/assetResolver';
import { logError } from '../../../lib/helpers/platform';
import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorageKeys } from '../../../lib/asyncStorage';
import { navigate, routeNames } from '../../../lib/helpers/navigation';
import { authErrorsFromServer } from '../../../lib/helpers/auth';

interface SignupFormValues extends IndexableObject {
  email: string;
  password: string;
  username: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  submitContainer: {
    height: 60,
    backgroundColor: colors.main.primary,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16
  },
  submitText: {
    fontFamily: fonts.ComfortaaBold,
    fontSize: 24,
    color: colors.main.white
  },
  continueUsingText: {
    alignSelf: 'center',
    marginTop: 24,
    fontFamily: fonts.CrimsonProLight
  },
  socialCtaGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24
  }
});

export const signupFormFieldKeys = {
  email: 'email',
  password: 'password',
  username: 'username'
};

const socialCtaImages = [
  assetResolver.images.facebook,
  assetResolver.images.google,
  assetResolver.images.apple
];

export const SignupForm = () => {
  const dispatch = useDispatch();
  const initialValues: SignupFormValues = {
    email: '',
    password: '',
    username: ''
  };

  const handleCreateAccount = useCallback(
    async (values: SignupFormValues, { setFieldError, resetForm }: any) => {
      const { email, password, username } = values;
      try {
        await createUserWithEmailAndPassword(
          dispatch,
          email,
          password,
          username
        );
        await AsyncStorage.setItem(AsyncStorageKeys.COMPLETED_FTUE, 'true');
        resetForm();
        navigate(routeNames.account.DOB);
      } catch (err: any) {
        if (err?.includes?.(authErrorsFromServer.emailInUse)) {
          setFieldError('email', 'Email already in use');
        } else if (err?.includes?.(authErrorsFromServer.invalidEmail)) {
          setFieldError('email', `Invalid email provided: ${email}`);
        } else if (err?.includes?.(authErrorsFromServer.weakPassword)) {
          setFieldError('email', 'Provided password was too weak.');
        } else if (err?.includes?.(authErrorsFromServer.usernameInUse)) {
          setFieldError('username', 'Username already in use');
        }

        logError(err);
      }
    },
    [dispatch]
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleCreateAccount}
      validationSchema={SignupSchema}
      validateOnChange={true}
      validateOnBlur={true}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched
      }) => {
        const handleError = (formFieldName: string) => {
          const isTouched = touched[formFieldName];
          const hasError = errors[formFieldName];
          if (isTouched && hasError) {
            return errors[formFieldName];
          }
        };

        return (
          <View style={styles.container}>
            <TextFormField
              handleChange={handleChange}
              handleBlur={handleBlur}
              fieldName={signupFormFieldKeys.username}
              value={values[signupFormFieldKeys.username]}
              error={handleError(signupFormFieldKeys.username)}
              placeholder="Enter your username"
              icon={'user'}
            />
            <TextFormField
              handleChange={handleChange}
              handleBlur={handleBlur}
              fieldName={signupFormFieldKeys.email}
              value={values[signupFormFieldKeys.email]}
              error={handleError(signupFormFieldKeys.email)}
              placeholder="Enter your email"
              icon={'envelope'}
            />
            <TextFormField
              handleChange={handleChange}
              handleBlur={handleBlur}
              fieldName={signupFormFieldKeys.password}
              value={values[signupFormFieldKeys.password]}
              error={handleError(signupFormFieldKeys.password)}
              placeholder="Enter your password"
              icon={'lock'}
              secure
            />
            <TouchableOpacity
              style={styles.submitContainer}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.submitText}>Continue</Text>
            </TouchableOpacity>
            <Text style={styles.continueUsingText}>Or continue using</Text>
            <View style={styles.socialCtaGroup}>
              {socialCtaImages.map((image, index) => (
                <SocialCta key={`social-cta-${index}`} image={image} />
              ))}
            </View>
          </View>
        );
      }}
    </Formik>
  );
};
