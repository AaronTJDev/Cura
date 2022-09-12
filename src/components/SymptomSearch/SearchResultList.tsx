import React, { useContext, useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  StyleSheet,
  View
} from 'react-native';

//** Components **/
import { SearchContext } from '.';
import SearchResult from './SearchResult';

//** Helpers **/
import { colors } from '../../lib/styles';
import { ON_BLUR_OFFSET } from './Search';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: ON_BLUR_OFFSET / 2,
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

interface SearchResultListProps {
  suggestions: ISearchResult[];
}

const SearchResultList: React.FC<SearchResultListProps> = ({ suggestions }) => {
  const { isLoading, isTouched, isBlurred } = useContext(SearchContext);
  const scrollViewTranslateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isTouched) {
      Animated.timing(scrollViewTranslateY, {
        toValue: -ON_BLUR_OFFSET,
        duration: 250,
        useNativeDriver: true,
        easing: Easing.ease
      }).start();
    }

    if (isBlurred) {
      Animated.timing(scrollViewTranslateY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
        easing: Easing.ease
      }).start();
    }
  }, [isTouched, isBlurred, scrollViewTranslateY]);

  useEffect(() => {
    console.log('isLoading', isLoading);
  }, [isLoading]);

  return (
    <Animated.ScrollView
      style={[
        styles.container,
        {
          transform: [{ translateY: scrollViewTranslateY }]
        }
      ]}
    >
      {isLoading ? (
        <ActivityIndicatorView />
      ) : (
        suggestions?.length > 0 &&
        suggestions.map((suggestion: ISearchResult) => {
          return <SearchResult data={suggestion} />;
        })
      )}
    </Animated.ScrollView>
  );
};

export default SearchResultList;
