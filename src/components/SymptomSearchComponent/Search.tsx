import React, { useContext, useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';

//** Components **/
import { SearchBar } from './SearchBar';

//** Helpers **/
import { colors, fonts } from '../../lib/styles';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../lib/constants';
import { isAndroid } from '../../lib/helpers/platform';
import { SearchContext } from '../../screens/SymptomSearch';

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
  }
});

export const Search = () => {
  const { query, isTouched, isBlurred, suggestions } =
    useContext(SearchContext);

  // Animation Values
  const fadeHeaderText = useRef(new Animated.Value(1)).current;
  const translateYHeader = useRef(new Animated.Value(0)).current;
  const dropShadowValue = isAndroid ? 2 : 0.05;
  const fadeInDropShadow = useRef(new Animated.Value(0)).current;

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
      <SearchBar />
    </Animated.View>
  );
};
