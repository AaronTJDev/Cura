import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet } from 'react-native';
import { assetResolver } from '../../../lib/assetResolver';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../lib/constants';

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: SCREEN_HEIGHT * 0.05
  },
  logo: {
    width: 120,
    height: 40
  }
});

export const OnboardingLogo = () => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      useNativeDriver: true,
      duration: 500,
      toValue: 1
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Image style={styles.logo} source={assetResolver.images.logo} />
    </Animated.View>
  );
};
