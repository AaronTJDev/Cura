import { Formik } from 'formik';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';

/** Components */
import { CustomModal } from '../../../modals/CustomModal';
import { Loader } from '../../utility/Loader';
import { ScreenWrapper } from '../../utility/ScreenWrapper';
import { TextFormFieldB } from './TextFormFieldB';

/** Helpers */
import { signin } from '../../../redux/account/actions';
import { IndexableObject } from '../../../lib/types/forms';
import { logError } from '../../../lib/helpers/platform';
import { getAccount } from '../../../redux/account/selectors';
import { colors, fonts } from '../../../lib/styles';
import { AccountEditSchema } from '../../../lib/validationSchemas';
import { toString } from 'lodash';

interface AccountEditProps {}

interface AccountEditFormValues extends IndexableObject {
  email: string;
  username: string;
  dateOfBirth: string;
  currentPassword: string;
  password: string;
  confirmPassword: string;
  uid?: string;
}

type updateResult = {
  title: string;
  message: string;
};

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
    top: 24
  },
  submitText: {
    fontFamily: fonts.ComfortaaBold,
    fontSize: 24,
    color: colors.main.white
  }
});

const accountEditFormFieldKeys = {
  email: 'email',
  username: 'username',
  dateOfBirth: 'dateOfBirth',
  currentPassword: 'currentPassword',
  password: 'password',
  confirmPassword: 'confirmPassword',
  uid: 'uid'
};

const accountEditFormLabels = {
  email: 'Email',
  username: 'Username',
  dateOfBirth: 'Date of birth',
  currentPassword: 'Current password',
  password: 'Password',
  confirmPassword: 'Confirm password',
  uid: 'UID'
};

export const AccountEdit: React.FC<AccountEditProps> = () => {
  const dispatch = useDispatch();
  const accountInfo = useSelector(getAccount);

  const initialValues: AccountEditFormValues = {
    email: accountInfo.email ?? '',
    username: accountInfo.username ?? '',
    dateOfBirth: accountInfo.dateOfBirth,
    currentPassword: '',
    password: '',
    confirmPassword: ''
  };

  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updateResult, setUpdateResult] = useState<updateResult>({
    title: '',
    message: ''
  });
  const [showModal, setShowModal] = useState<boolean>(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleCloseModal = () => {
    toggleModal();
  };

  const updateAccount = useCallback(
    async (
      values: AccountEditFormValues,
      { setFieldError, resetForm }
    ): Promise<void> => {
      const { currentPassword, password } = values;
      const userEmail = accountInfo?.email || '';

      try {
        setIsUpdating(true);
        await auth().currentUser?.updatePassword(password);
        setUpdateResult({
          title: 'Success',
          message:
            'Congratulations! Your password has been successfully updated. You can now use your new password to log in to your account.'
        });
        toggleModal();
        resetForm();
      } catch (err) {
        logError(err);
        const stringErr = toString(err);
        // Firebase requries recent login to update password
        // If it fails, we'll silently relogin and retry to update password
        if (stringErr.includes('[auth/requires-recent-login]')) {
          await signin(dispatch, userEmail, currentPassword)
            .then(() => updateAccount(values, { setFieldError, resetForm }))
            .catch((error) => {
              logError(error);
              setFieldError('currentPassword', 'Failed to update password');
            });
        } else {
          setFieldError('currentPassword', 'Failed to update password');
        }
      } finally {
        setIsUpdating(false);
      }
    },
    [dispatch, accountInfo]
  );

  return (
    <ScreenWrapper title={'Settings'}>
      <Formik
        initialValues={initialValues}
        onSubmit={updateAccount}
        validationSchema={AccountEditSchema}
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
              {/*
                <TextFormFieldB
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  fieldName={accountEditFormFieldKeys.username}
                  error={handleError(accountEditFormFieldKeys.username)}
                  value={values[accountEditFormFieldKeys.username]}
                  disabled
                  label={accountEditFormLabels.username}
                />
              */}
              <TextFormFieldB
                handleBlur={handleBlur}
                handleChange={handleChange}
                fieldName={accountEditFormFieldKeys.email}
                error={handleError(accountEditFormFieldKeys.email)}
                value={values[accountEditFormFieldKeys.email]}
                disabled
                label={accountEditFormLabels.email}
              />
              <TextFormFieldB
                handleBlur={handleBlur}
                handleChange={handleChange}
                fieldName={accountEditFormFieldKeys.currentPassword}
                error={handleError(accountEditFormFieldKeys.currentPassword)}
                value={values[accountEditFormFieldKeys.currentPassword]}
                label={accountEditFormLabels.currentPassword}
                secure
              />
              <TextFormFieldB
                handleBlur={handleBlur}
                handleChange={handleChange}
                fieldName={accountEditFormFieldKeys.password}
                error={handleError(accountEditFormFieldKeys.password)}
                value={values[accountEditFormFieldKeys.password]}
                label={accountEditFormLabels.password}
                secure
              />
              <TextFormFieldB
                handleBlur={handleBlur}
                handleChange={handleChange}
                fieldName={accountEditFormFieldKeys.confirmPassword}
                error={handleError(accountEditFormFieldKeys.confirmPassword)}
                value={values[accountEditFormFieldKeys.confirmPassword]}
                label={accountEditFormLabels.confirmPassword}
                secure
              />
              <TouchableOpacity
                style={styles.submitContainer}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.submitText}>Update Password</Text>
              </TouchableOpacity>
              <Loader isLoading={isUpdating} />
            </View>
          );
        }}
      </Formik>
      <CustomModal
        title={updateResult.title}
        message={updateResult.message}
        visible={showModal}
        onClose={handleCloseModal}
      />
    </ScreenWrapper>
  );
};
