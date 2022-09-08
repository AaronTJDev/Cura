import React from 'react';
import { StyleSheet, View } from 'react-native';

//** Components **/
import { Search } from './Search';

//** Helpers **/
import { colors } from '../../lib/styles';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.main.white
  },
  gradient: {
    flex: 1
  },
});

const SymptomSearch = () => {
  return (
    <View style={styles.container}>
      <Search/>
      <LinearGradient
        style={styles.gradient}
        colors={[colors.main.white, colors.main.white, colors.main.primaryLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1.25 }}
      ></LinearGradient>
    </View>
  );
};

export default SymptomSearch;
