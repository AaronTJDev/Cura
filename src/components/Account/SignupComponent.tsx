import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../lib/styles';
import { ScreenWrapper } from '../utility/ScreenWrapper';
import { SignupForm } from './Forms/SignupForm';

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

export default function SignupComponent() {
  return (
    <ScreenWrapper title={'Sign Up'}>
      <Animated.View style={stlyes.container}>
        <View style={stlyes.textContainer}>
          <Text style={stlyes.title}>Let's Get Started</Text>
          <Text style={stlyes.subtitle}>
            It will only take a minute! We Promise.
          </Text>
        </View>
        <View style={{ flex: 5 }}>
          <SignupForm />
        </View>
      </Animated.View>
      <Animated.View style={[, {backgroundColor: 'blue'}]}>

      </Animated.View>
    </ScreenWrapper>
  );
}
