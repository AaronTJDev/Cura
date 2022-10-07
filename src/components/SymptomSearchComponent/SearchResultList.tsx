import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  StyleSheet,
  View
} from 'react-native';

//** Components **/
import { SearchContext } from '../../screens/SymptomSearch';
import SearchResult from './SearchResult';

//** Helpers **/
import { colors } from '../../lib/styles';
import { ON_BLUR_OFFSET } from './Search';
import DiseasesModal from './DiseasesModal';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    paddingBottom: 24,
    backgroundColor: colors.main.white
  },
  activityIndicatorView: {
    marginHorizontal: 8
  }
});

const ActivityIndicatorView = () => {
  return (
    <View style={styles.activityIndicatorView}>
      <ActivityIndicator />
    </View>
  );
};

export interface ISymptom {
  id: string;
  name: string;
  description: string;
}

interface SearchResultListProps {
  suggestions: ISymptom[];
}

const SearchResultList: React.FC<SearchResultListProps> = ({ suggestions }) => {
  const { isLoading, isTouched, isBlurred } = useContext(SearchContext);
  const [activeIndex, setActiveIndex] = useState<number | undefined>();
  const scrollViewTranslateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isTouched) {
      Animated.timing(scrollViewTranslateY, {
        toValue: -ON_BLUR_OFFSET / 2,
        duration: 250,
        useNativeDriver: true,
        easing: Easing.ease
      }).start();
    }

    if (isBlurred && !suggestions?.length) {
      Animated.timing(scrollViewTranslateY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
        easing: Easing.ease
      }).start();
    }
  }, [isTouched, isBlurred, scrollViewTranslateY]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: scrollViewTranslateY }]
        }
      ]}
    >
      <Animated.ScrollView>
        {isLoading && <ActivityIndicatorView />}
        {suggestions?.length >= 0 &&
          suggestions.map((suggestion: ISymptom, index) => {
            return (
              <SearchResult
                key={suggestion.id}
                data={suggestion}
                index={index}
                setActiveIndex={setActiveIndex}
                activeIndex={activeIndex}
              />
            );
          })}
      </Animated.ScrollView>
      <DiseasesModal />
    </Animated.View>
  );
};

export default SearchResultList;
