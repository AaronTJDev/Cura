import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { FormikErrors } from 'formik';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome';

import { colors, fonts } from '../../../lib/styles';
import { upperFirst } from 'lodash-es';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { signupFormFieldKeys } from './SignupForm';

interface FormFieldProps {
  handleChange: any;
  handleBlur: (e: FocusEvent) => void;
  value: string;
  error:
    | string
    | string[]
    | FormikErrors<any>
    | FormikErrors<any>[]
    | undefined;
  fieldName: string;
  placeholder: string;
  icon: IconProp;
  secure?: boolean;
}

const styles = StyleSheet.create({
  container: {
    height: 68,
    borderRadius: 14,
    borderColor: colors.main.gray25,
    borderWidth: 1,
    padding: 12,
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
    fontFamily: fonts.ComfortaaMedium,
    fontSize: 12,
    lineHeight: 18,
    color: colors.main.black
  },
  labelIcon: {
    flex: 1
  },
  placeholder: {},
  visible: {
    position: 'absolute',
    width: 40,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    margin: 12,
    right: 0
  }
});

export const TextFormField: React.FC<FormFieldProps> = ({
  fieldName,
  placeholder,
  icon,
  secure
}) => {
  const [shouldShowSecureEntry, setShouldShowSecureEntry] =
    useState<boolean>(false);

  const toggleSecureVisibility = () => {
    setShouldShowSecureEntry(!shouldShowSecureEntry);
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelGroup}>
        <Icon
          style={styles.labelIcon}
          icon={icon}
          color={colors.main.secondary}
          size={14}
          secondaryColor={colors.main.black}
          secondaryOpacity={1}
        />
        <Text style={styles.label}>{upperFirst(fieldName)}</Text>
      </View>
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secure && shouldShowSecureEntry}
      />
      {fieldName === signupFormFieldKeys.password && (
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
