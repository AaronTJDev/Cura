import React, { useContext, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  StyleSheet,
  View
} from 'react-native';

//** Components **/
import { SearchContext } from '../../screens/SymptomSearchScreen';

//** Helpers **/
import { colors } from '../../lib/styles';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const styles = StyleSheet.create({
  container: {
    flex: 9
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

export const SearchResultList: React.FC<SearchResultListProps> = ({ suggestions }) => {
  const { isLoading, isTouched, isBlurred } = useContext(SearchContext);
  const [activeIndex, setActiveIndex] = useState<number | undefined>();
  const scrollViewTranslateY = useRef(new Animated.Value(0)).current;
  const bottomTabBarHeight = useBottomTabBarHeight();

  return (
    <View style={styles.container}>

    </View>
  );
};
