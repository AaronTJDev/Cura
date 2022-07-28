import React, { useCallback } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';

/** Helpers */
import { colors, fonts } from '../../../lib/styles';
import { login } from '../../../redux/account/actions';
import { LoginSchema } from '../../../lib/validationSchemas';
import { navigate } from '../../../lib/helpers/navigation';

const styles = StyleSheet.create({
  formContainer: {
    width: '66%',
    alignItems: 'center',
  },
  formInputView: {
    marginTop: 32,
    borderBottomColor: colors.main.primaryDark,
    borderBottomWidth: 1,
    width: '100%',
  },
  formInput: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontFamily: fonts.CrimsonProLight,
    fontSize: 18,
    padding: 8,
    width: '100%',
    height: 36,
  },
  registerButton: {
    marginTop: 43,
    width: '100%',
    height: 48,
    backgroundColor: colors.main.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.main.white,
    fontFamily: fonts.NunitoSansBold,
    fontSize: 16,
  },
  errorMsg: {
    color: colors.indicators.error,
    top: 16,
  },
});

interface LoginFormValues {
  email: string;
  password: string;
}

export default function SignupForm() {
  const dispatch = useDispatch();
  const initialValues = {
    email: '',
    password: '',
  };

  const handleLogin = useCallback(
    async (values: LoginFormValues, { setFieldError, resetForm }: any) => {
      const { email, password } = values;
      try {
        await login(dispatch, email, password);
        resetForm();
        navigate('Home');
      } catch (err) {
        console.log('err', err);
        setFieldError('email', 'Email or password is incorrect');
        throw err;
      }
    },
    [dispatch],
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleLogin}
      validationSchema={LoginSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View style={styles.formContainer}>
          <View style={styles.formInputView}>
            <TextInput
              style={styles.formInput}
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              textContentType="emailAddress"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.formInputView}>
            <TextInput
              style={styles.formInput}
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              textContentType={'password'}
              autoCapitalize="none"
              secureTextEntry
            />
          </View>
          <View>
            {(!!errors.email || !!errors.password) && (
              <Text style={styles.errorMsg}>
                {errors.email || errors.password}
              </Text>
            )}
          </View>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
}
