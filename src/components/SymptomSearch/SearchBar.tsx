import React, { useContext, useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Formik } from 'formik';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome';

//** Helpers **/
import { colors, fonts } from '../../lib/styles';
import { SearchSchema } from '../../lib/validationSchemas';
import { isIos } from '../../lib/helpers/platform';
import { SearchContext } from '.';

const styles = StyleSheet.create({
  searchQueryInputView: {
    marginTop: 32,
    borderBottomColor: colors.main.primaryDark,
    borderBottomWidth: 1,
    width: '80%',
    flexDirection: 'row',
    backgroundColor: colors.main.white
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
    height: '100%'
  },
  searchInfoTextView: {
    width: '80%',
    height: 36,
    padding: 8
  },
  searchInfoText: {
    fontFamily: fonts.CrimsonProExtraLight,
    fontSize: 14,
    color: colors.main.gray50,
    textAlign: 'center'
  }
});

const initialValues = {
  query: ''
};

export const SearchBar = () => {
  const {
    setQuery,
    setTextInputTouched,
    setTextInputBlurred,
    isTouched,
    isBlurred,
    suggestions,
    query
  } = useContext(SearchContext);
  const infoOpacity = useRef(new Animated.Value(0)).current;
  const infoTranslateY = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    if (isTouched) {
      Animated.parallel([
        Animated.timing(infoOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
          easing: Easing.ease
        }),
        Animated.timing(infoTranslateY, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
          easing: Easing.ease
        })
      ]).start();
    }

    if (isBlurred && !suggestions?.length && !query?.length) {
      Animated.parallel([
        Animated.timing(infoOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
          easing: Easing.ease
        }),
        Animated.timing(infoTranslateY, {
          toValue: 16,
          duration: 250,
          useNativeDriver: true,
          easing: Easing.ease
        })
      ]).start();
    }
  }, [isTouched, isBlurred, infoOpacity, infoTranslateY, suggestions]);

  const handleSubmit = async () => {};

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SearchSchema}
      validateOnBlur
      validateOnChange
      onSubmit={handleSubmit}
    >
      {({ handleBlur, setFieldValue, values }) => {
        const handleAnimationOnFocus = () => {
          setTextInputTouched(true);
          setTextInputBlurred(false);
        };

        const handleAnimationOnBlur = () => {
          setTextInputTouched(false);
          setTextInputBlurred(true);
          handleBlur('query');
        };

        const onChange = (text: string) => {
          setFieldValue('query', text);
          setQuery(text);
        };

        return (
          <>
            <Animated.View style={styles.searchQueryInputView}>
              <TextInput
                style={styles.searchQueryInput}
                placeholder="Headache"
                value={values.query}
                onBlur={handleAnimationOnBlur}
                onFocus={handleAnimationOnFocus}
                onChangeText={onChange}
                underlineColorAndroid="transparent"
                keyboardType={isIos ? 'default' : 'visible-password'}
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
            <Animated.View
              style={[
                styles.searchInfoTextView,
                {
                  opacity: infoOpacity,
                  transform: [{ translateY: infoTranslateY }]
                }
              ]}
            >
              <Text style={styles.searchInfoText}>
                Please search for symptom(s) you’re experiencing
              </Text>
            </Animated.View>
          </>
        );
      }}
    </Formik>
  );
};
