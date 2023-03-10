import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../lib/styles';
import { ScreenWrapper } from '../utility/ScreenWrapper';
import { SigninForm } from './Forms/SigninForm';

const stlyes = StyleSheet.create({
  container: {
    flex: 1
  },
  textContainer: {
    flex: 1
  },
  title: {
    fontFamily: fonts.CrimsonProBold,
    fontSize: 32,
    paddingBottom: 4,
    color: colors.main.black
  },
  subtitle: {
    fontFamily: fonts.ComfortaaRegular,
    fontSize: 14,
    color: colors.main.gray25
  }
});

export default function SigninComponent() {
  return (
    <ScreenWrapper title={'Sign In'}>
      <Animated.View style={stlyes.container}>
        <View style={stlyes.textContainer}>
          <Text style={stlyes.title}>Welcome Back</Text>
          <Text style={stlyes.subtitle}>Please sign in to continue.</Text>
        </View>
        <View style={{ flex: 5 }}>
          <SigninForm />
        </View>
      </Animated.View>
    </ScreenWrapper>
  );
}
