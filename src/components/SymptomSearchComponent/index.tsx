import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { SCREEN_HEIGHT } from '../../lib/constants';
import { colors } from '../../lib/styles';
import { SearchContext } from '../../screens/SymptomSearch';
import { ON_BLUR_OFFSET, Search } from './Search';
import SearchResultList from './SearchResultList';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: SCREEN_HEIGHT,
    paddingBottom: ON_BLUR_OFFSET / 2,
    backgroundColor: colors.main.white
  }
});

export const SymptomSearchComponent = () => {
  const { suggestions } = useContext(SearchContext);
  return (
    <View style={styles.container}>
      <Search />
      <SearchResultList suggestions={suggestions} />
    </View>
  );
};

export default SymptomSearchComponent;
