import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

/** Components */
import { SocialCta } from './SocialCta';

/** Helpers */
import { createUserWithEmailAndPassword } from '../../../redux/account/actions';
import { SignupSchema } from '../../../lib/validationSchemas';
import { TextFormField } from './TextFormField';
import { IndexableObject } from '../../../lib/types/forms';
import { colors, fonts } from '../../../lib/styles';
import { assetResolver } from '../../../lib/assetResolver';

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
  const navigation = useNavigation();
  const initialValues: SignupFormValues = {
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
        navigation.goBack();
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
        console.log('errors', errors, touched);
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
              {socialCtaImages.map((image) => (
                <SocialCta image={image} />
              ))}
            </View>
          </View>
        );
      }}
    </Formik>
  );
};
