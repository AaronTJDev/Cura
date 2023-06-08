import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

/** Components */
import { SocialCta } from './SocialCta';

/** Helpers */
import { signin } from '../../../redux/account/actions';
import { SigninSchema } from '../../../lib/validationSchemas';
import { TextFormField } from './TextFormField';
import { IndexableObject } from '../../../lib/types/forms';
import { colors, fonts } from '../../../lib/styles';
import { assetResolver } from '../../../lib/assetResolver';
import { navigate, routeNames } from '../../../lib/helpers/navigation';
import { toString } from 'lodash';

interface SigninFormValues extends IndexableObject {
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
    alignItems: 'center'
  },
  submitText: {
    fontFamily: fonts.ComfortaaBold,
    fontSize: 24,
    color: colors.main.white
  },
  continueUsingTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  continueUsingText: {
    fontFamily: fonts.CrimsonProLight
  },
  socialCtaGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 4
  },
  newUserContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  newUser: {
    fontSize: 10,
    fontFamily: fonts.ComfortaaMedium,
    color: colors.main.black
  },
  newUserCta: {
    color: colors.main.primaryLight
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

export const SigninForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const initialValues: SigninFormValues = {
    email: '',
    password: '',
    username: ''
  };

  const handleSignIn = useCallback(
    async (values: SigninFormValues, { setFieldError, resetForm }: any) => {
      const { email, password } = values;
      try {
        await signin(dispatch, email, password);
        resetForm();
        navigation.goBack();
      } catch (err) {
        const stringErr = toString(err);
        if (stringErr.includes('[auth/wrong-password]')) {
          setFieldError(
            signupFormFieldKeys.password,
            'Incorrect credentials provided'
          );
        } else if (stringErr.includes('[auth/user-not-found]')) {
          setFieldError(
            signupFormFieldKeys.email,
            'Credentials provided were not found or incorrect.'
          );
        }
      }
    },
    [dispatch]
  );

  const navigateToSignUp = () => {
    navigate(routeNames.account.SIGNUP);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSignIn}
      validationSchema={SigninSchema}
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
            {false && (
              <>
                <View style={styles.continueUsingTextContainer}>
                  <Text style={styles.continueUsingText}>
                    Or continue using
                  </Text>
                </View>
                <View style={styles.socialCtaGroup}>
                  {socialCtaImages.map((image, index) => (
                    <SocialCta key={`social-cta-${index}`} image={image} />
                  ))}
                </View>
              </>
            )}
            <TouchableOpacity
              style={styles.newUserContainer}
              onPress={navigateToSignUp}
            >
              <Text style={styles.newUser}>
                Don't have an account?
                <Text style={styles.newUserCta}> Register Now</Text>
              </Text>
            </TouchableOpacity>
          </View>
        );
      }}
    </Formik>
  );
};
