import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

/** Helpers */
import { getIsAccountLoading } from '../../redux/account/selectors';

const styles = StyleSheet.create({
  loader: {
    backgroundColor: 'rgba(251, 252, 255, 0.25)',
    width: '100%',
    height: '100%',
    position: 'absolute'
  }
});

// The purpose of this is to render the loader on async redux actions
export const GlobalLoader = () => {
  const isAccontLoading = useSelector(getIsAccountLoading);

  return <>{isAccontLoading && <ActivityIndicator style={styles.loader} />}</>;
};
