import React, { useContext, useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';

//** Helpers **/
import { colors, fonts } from '../../lib/styles';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../lib/constants';
import { isAndroid } from '../../lib/helpers/platform';
import { SearchBar } from './SearchBar';
import { SearchContext } from '.';

export const ON_BLUR_OFFSET = 144;
const SEARCH_BAR_CONTAINER_HEIGHT = SCREEN_HEIGHT / 4;

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: colors.main.white,
    width: SCREEN_WIDTH,
    height: SEARCH_BAR_CONTAINER_HEIGHT,
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    zIndex: 10,
    elevation: 0,
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
    top: 64
  },
  searchHeaderText: {
    textAlign: 'center',
    fontSize: 36,
    fontFamily: fonts.NunitoSansLight,
    color: colors.main.black
  }
});

export const Search = () => {
  const { query, isTouched, isBlurred } = useContext(SearchContext);

  // Animation Values
  const fadeHeaderText = useRef(new Animated.Value(1)).current;
  const translateYHeader = useRef(new Animated.Value(0)).current;
  const dropShadowValue = isAndroid ? 2 : 0.05;
  const fadeInDropShadow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isTouched) {
      Animated.parallel([
        Animated.timing(fadeHeaderText, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
          easing: Easing.ease
        }),
        Animated.timing(translateYHeader, {
          toValue: -ON_BLUR_OFFSET,
          duration: 250,
          useNativeDriver: true,
          easing: Easing.ease
        }),
        Animated.timing(fadeInDropShadow, {
          toValue: dropShadowValue,
          duration: 250,
          useNativeDriver: true,
          easing: Easing.ease
        })
      ]).start();
    }

    if (isBlurred && !query?.length) {
      Animated.parallel([
        Animated.timing(fadeHeaderText, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
          easing: Easing.ease
        }),
        Animated.timing(translateYHeader, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
          easing: Easing.ease
        }),
        Animated.timing(fadeInDropShadow, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
          easing: Easing.ease
        })
      ]).start();
    }
  }, [
    dropShadowValue,
    isTouched,
    isBlurred,
    fadeHeaderText,
    fadeInDropShadow,
    translateYHeader,
    query
  ]);

  return (
    <Animated.View
      style={[
        styles.outerContainer,
        {
          transform: [{ translateY: translateYHeader }],
          elevation: fadeInDropShadow,
          shadowOpacity: fadeInDropShadow
        }
      ]}
    >
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
      <SearchBar />
    </Animated.View>
  );
};
