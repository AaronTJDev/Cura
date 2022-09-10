import React from 'react'
import { Animated, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import { Formik } from 'formik';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome';

//** Helpers **/
import { colors, fonts } from '../../lib/styles';
import { SearchSchema } from '../../lib/validationSchemas';
import { getUserToken } from '../../lib/helpers/auth';

const styles = StyleSheet.create({
  searchQueryInputView: {
    marginTop: 32,
    borderBottomColor: colors.main.primaryDark,
    borderBottomWidth: 1,
    width: '80%',
    flexDirection: 'row'
  },
  searchQueryInput: {
    alignSelf: 'flex-start',
    textAlign: 'left',
    fontFamily: fonts.CrimsonProLight,
    fontSize: 28,
    padding: 8,
    width: '88%',
    height: 48,
    top: 8,
    textAlignVertical: 'center',
    textDecorationLine: 'none'
  },
  searchButtonContainer: {
    width: '12%',
    height: 48,
    right: 8,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    top: 8
  },
  searchButton: {
    width: '100%',
    height: '100%',
  },
  errorMsg: {
    color: colors.indicators.error,
    top: 16
  },
});

interface SearhBarProps {
  setTextInputTouched: React.Dispatch<React.SetStateAction<boolean>>;
  setTextInputBlurred: React.Dispatch<React.SetStateAction<boolean>>;
  setTextValue: React.Dispatch<React.SetStateAction<string>>;
  isBlurred: boolean;
  isTouched: boolean;
};

const initialValues = {
  query: ''
};

export const SearchBar: React.FC<SearhBarProps> = (props) => {
  const { setTextInputTouched, setTextInputBlurred, setTextValue } = props;
  const handleSubmit = async () => {
    const token = await getUserToken();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SearchSchema}
      validateOnBlur
      validateOnChange
      onSubmit={handleSubmit}
    >
      {
        ({handleBlur, setFieldValue, values}) => {
          const handleAnimationOnFocus = () => {
            setTextInputTouched(true);
            setTextInputBlurred(false);
          };

          const handleAnimationOnBlur = () => {
            setTextInputTouched(false);
            setTextInputBlurred(true);
            handleBlur('query')
          };

          const onChange = (text: string) => {
            setFieldValue('query', text);
            setTextValue(text);
          }

          return (
            <>
              <Animated.View style={styles.searchQueryInputView}>
                <TextInput
                  style={styles.searchQueryInput}
                  placeholder='Headache'
                  value={values.query}
                  onBlur={handleAnimationOnBlur}
                  onFocus={handleAnimationOnFocus}
                  onChangeText={onChange}
                  underlineColorAndroid='transparent'
                  keyboardType='visible-password'
                />
                <TouchableOpacity
                  style={styles.searchButtonContainer}
                  onPress={handleSubmit}
                >
                  <Icon
                    style={styles.searchButton}
                    icon={'search'}
                    size={18}
                    color={colors.main.black}
                  />
                </TouchableOpacity>
              </Animated.View>
            </>
          )
        }
      }
    </Formik>
  )
}