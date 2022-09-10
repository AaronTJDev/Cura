import React from 'react';
import { StyleSheet, View } from 'react-native';

//** Components **/
import { Search } from './Search';

//** Helpers **/
import { colors } from '../../lib/styles';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.main.white
  },
  gradient: {
    flex: 1
  }
});

const SymptomSearch = () => {
  return (
    <View style={styles.container}>
      <Search />
    </View>
  );
};

export default SymptomSearch;
