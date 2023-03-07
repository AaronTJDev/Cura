import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

/** Helpers */
import { ScreenWrapper } from '../utility/ScreenWrapper';

const styles = StyleSheet.create({
  authContainer: {
    flex: 1
  }
});

export default function AccountComponent() {
  return (
    <ScreenWrapper title={'Account'} hideBackButton={true}>
      <View style={styles.authContainer}>
        <Text>hello</Text>
      </View>
    </ScreenWrapper>
  );
}
