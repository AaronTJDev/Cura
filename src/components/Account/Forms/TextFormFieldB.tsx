import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { FieldInputProps, FormikErrors } from 'formik';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome';

import { colors, fonts } from '../../../lib/styles';
import { upperFirst } from 'lodash-es';
import { signupFormFieldKeys } from './SignupForm';

interface FormFieldProps {
  handleChange: FieldInputProps<any>['onChange'];
  handleBlur: FieldInputProps<any>['onBlur'];
  value: string;
  error:
    | string
    | string[]
    | FormikErrors<any>
    | FormikErrors<any>[]
    | undefined;
  fieldName: string;
  placeholder?: string;
  secure?: boolean;
  disabled?: boolean;
  label: string;
}

const styles = StyleSheet.create({
  container: {
    height: 68,
    marginBottom: 16
  },
  labelGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  label: {
    flex: 5,
    marginLeft: 8,
    fontFamily: fonts.ComfortaaBold,
    fontSize: 12,
    lineHeight: 18,
    color: colors.main.black,
    height: 20
  },
  labelIcon: {
    flex: 1
  },
  labelError: {
    color: colors.indicators.error,
    fontSize: 10
  },
  textInput: {
    fontSize: 14,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1,
    width: '100%',
    padding: 0
  },
  textInputContainer: {
    flex: 1,
    width: '96%',
    left: '2%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderRadius: 14,
    borderColor: colors.main.gray25,
    borderWidth: 1,
    padding: 12
  },
  visible: {
    position: 'absolute',
    width: 40,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    margin: 12,
    right: 12
  }
});

export const TextFormFieldB: React.FC<FormFieldProps> = ({
  handleBlur,
  handleChange,
  fieldName,
  placeholder,
  secure,
  error,
  disabled,
  value,
  label
}) => {
  const [shouldShowSecureEntry, setShouldShowSecureEntry] =
    useState<boolean>(true);
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 75,
        useNativeDriver: true
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 75,
        useNativeDriver: true
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 75,
        useNativeDriver: true
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 75,
        useNativeDriver: true
      })
    ]).start();
  };

  const toggleSecureVisibility = () => {
    setShouldShowSecureEntry(!shouldShowSecureEntry);
  };

  useEffect(() => {
    if (error) {
      shake();
    }
  }, [error]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.labelGroup,
          { transform: [{ translateX: shakeAnimation }] }
        ]}
      >
        <Text
          style={[
            styles.label,
            error ? { color: colors.indicators.error } : {}
          ]}
        >
          {upperFirst(label)}
        </Text>
        {!!error && <Text style={styles.labelError}>{error}</Text>}
      </Animated.View>
      <View
        style={[
          styles.textInputContainer,
          disabled ? { backgroundColor: colors.main.gray10 } : {}
        ]}
      >
        <TextInput
          style={styles.textInput}
          onChangeText={handleChange(fieldName)}
          onBlur={handleBlur(fieldName)}
          placeholder={placeholder}
          secureTextEntry={secure && shouldShowSecureEntry}
          autoCapitalize="none"
          editable={disabled ? false : true}
          selectTextOnFocus={disabled ? true : true}
          value={value}
        />
      </View>
      {fieldName.toLowerCase().includes(signupFormFieldKeys.password) && (
        <TouchableOpacity
          style={styles.visible}
          onPress={toggleSecureVisibility}
        >
          <Icon
            icon={shouldShowSecureEntry ? 'eye' : 'eye-slash'}
            color={colors.main.secondary}
            size={18}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
