import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  loader: {
    backgroundColor: 'rgba(251, 252, 255, 0.25)',
    width: '100%',
    height: '100%',
    position: 'absolute'
  }
});

interface LoaderProps {
  isLoading: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  return <>{isLoading && <ActivityIndicator style={styles.loader} />}</>;
};
