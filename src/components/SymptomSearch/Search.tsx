import React, { RefObject, useEffect, useRef, useState } from 'react'
import { Animated, Easing, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Formik } from 'formik';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome';

//** Helpers **/
import { colors, fonts } from '../../lib/styles';
import { SearchSchema } from '../../lib/validationSchemas';
import { getUserToken } from '../../lib/helpers/auth';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../lib/constants';
import { isAndroid } from '../../lib/helpers/platform';

const INNER_CONTAINER_HEIGHT = 200;
const ON_BLUR_OFFSET = 144;

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: colors.main.white,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT / 4,
    shadowOffset: {
      width: 20,
      height: 20
    },
    shadowOpacity: 1,
    shadowRadius: 40,
    zIndex: 10,
    elevation: 0
  },
  innerContainer: {
    display: 'flex',
    width: '96%',
    height: INNER_CONTAINER_HEIGHT,
    alignSelf: 'center',
    alignItems: 'center',
    top: 64,
    zIndex: 2,
    
  },
  searchHeaderText: {
    textAlign: 'center',
    fontSize: 36,
    fontFamily: fonts.NunitoSansLight,
    color: colors.main.black
  },
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

const SearchBar= (props: SearhBarProps) => {
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

export const Search = () => {
  const [textInputTouched, setTextInputTouched] = useState<boolean>(false);
  const [textInputBlurred, setTextInputBlurred] = useState<boolean>(false);
  const [textValue, setTextValue] = useState<string>('');
  const fadeHeaderText = useRef(new Animated.Value(1)).current;
  const translateYHeader = useRef(new Animated.Value(0)).current;
  const dropShadowValue = isAndroid ? 2 : 4;
  const fadeInDropShadow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (textInputTouched) {
      Animated.timing(fadeHeaderText, {
        toValue: 0,
        duration:300,
        useNativeDriver: true,
        easing: Easing.ease
      }).start();
      Animated.timing(translateYHeader, {
        toValue: -ON_BLUR_OFFSET,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.ease
      }).start();
      Animated.timing(fadeInDropShadow, {
        toValue: dropShadowValue,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.ease
      }).start();
    }

    if (textInputBlurred && !textValue?.length) {
      Animated.timing(fadeHeaderText, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.ease
      }).start();
      Animated.timing(translateYHeader, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.ease
      }).start();
      Animated.timing(fadeInDropShadow, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.ease
      }).start();
    }
  }, [textInputTouched, textInputBlurred])

  return (
    <Animated.View
      style={[
        styles.outerContainer,
        {
          transform: [{translateY: translateYHeader}],
          elevation: fadeInDropShadow
        }
      ]}
    >
      <Animated.View style={styles.innerContainer}>
        <Animated.Text 
          style={[
            styles.searchHeaderText,
            {
              opacity: fadeHeaderText
            }
          ]}
        >
          What's going on?
        </Animated.Text>
        <SearchBar
          setTextInputTouched={setTextInputTouched}
          setTextInputBlurred={setTextInputBlurred}
          isTouched={textInputTouched}
          isBlurred={textInputBlurred}
          setTextValue={setTextValue}
        />
      </Animated.View>
    </Animated.View>
  )
};
