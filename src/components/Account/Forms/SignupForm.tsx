import React from 'react';
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

const styles = StyleSheet.create({
  formContainer: {
    width: '66%',
    alignItems: 'center'
  },
  formInputView: {
    marginTop: 32,
    borderBottomColor: colors.main.primaryDark,
    borderBottomWidth: 1,
    width: '100%'
  },
  formInput: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontFamily: fonts.CrimsonProLight,
    fontSize: 18,
    padding: 8,
    width: '100%',
    height: 36
  },
  registerButton: {
    marginTop: 43,
    width: '100%',
    height: 48,
    backgroundColor: colors.main.primaryDark,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: colors.main.white,
    fontFamily: fonts.NunitoSansBold,
    fontSize: 16
  }
});

interface SignupFormValues {
  email: string;
  password: string;
  name: string;
}

export default function SignupForm() {
  const dispatch = useDispatch();
  const initialValues = {
    email: '',
    password: '',
    name: ''
  }

  const handleSubmit = (values: SignupFormValues) => {
    const { email, password } = values;
    createUserWithEmailAndPassword(dispatch, email, password);
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.formContainer}>
          <View style={styles.formInputView}>
            <TextInput
              style={styles.formInput}
              placeholder='Name'
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              textContentType={'name'}
            />
          </View>
          <View style={styles.formInputView}>
            <TextInput
              style={styles.formInput}
              placeholder='Email'
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              textContentType='emailAddress'
            />
          </View>
          <View style={styles.formInputView}>
            <TextInput
              style={styles.formInput}
              placeholder='Password'
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              textContentType={'password'}
              secureTextEntry
            />
          </View>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>REGISTER</Text>
          </TouchableOpacity>
        </View>
      )}

    </Formik>
  )
}