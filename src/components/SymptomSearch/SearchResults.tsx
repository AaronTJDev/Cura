import React, { useContext, useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  StyleSheet,
  View
} from 'react-native';
import { SearchContext } from '.';
import { colors } from '../../lib/styles';
import { ON_BLUR_OFFSET } from './Search';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    top: 0,
    backgroundColor: colors.main.white
  },
  activityIndicatorView: {}
});

const ActivityIndicatorView = () => {
  return (
    <View style={styles.activityIndicatorView}>
      <ActivityIndicator />
    </View>
  );
};

export interface ISearchResult {
  name: string;
  description: string;
}

interface SearchResultsProp {
  suggestions: string[];
}

const SearchResults: React.FC<SearchResultsProp> = () => {
  const { isLoading, isTouched, isBlurred } = useContext(SearchContext);
  const scrollViewTranslateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isTouched) {
      Animated.timing(scrollViewTranslateY, {
        toValue: -ON_BLUR_OFFSET,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.ease
      }).start();
    }

    if (isBlurred) {
      Animated.timing(scrollViewTranslateY, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.ease
      }).start();
    }
  }, [isTouched, isBlurred, scrollViewTranslateY]);

  return (
    <Animated.ScrollView
      style={[
        styles.container,
        {
          transform: [{ translateY: scrollViewTranslateY }]
        }
      ]}
    >
      {isLoading ? <ActivityIndicatorView /> : <View />}
    </Animated.ScrollView>
  );
};

export default SearchResults;
