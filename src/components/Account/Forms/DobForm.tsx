import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

/** Components */
import { ScreenWrapper } from '../../utility/ScreenWrapper';

/** Helpers */
import { screenTitles } from '../../../lib/helpers/navigation';
import { colors, fonts } from '../../../lib/styles';

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

export default function DobForm() {
  return (
    <ScreenWrapper
      title={screenTitles.account.SIGNUP}
      hideBackButton
      expandedContentArea
    >
      <Animated.View style={stlyes.container}>
        <View style={stlyes.textContainer}>
          <Text style={stlyes.title}>Date of Birth</Text>
          <Text style={stlyes.subtitle}>
            Please select your month and year of birth.
          </Text>
        </View>
        <View style={{ flex: 5 }} />
      </Animated.View>
    </ScreenWrapper>
  );
}
