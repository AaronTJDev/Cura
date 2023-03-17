import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { screenTitles } from '../../lib/helpers/navigation';
import { logError } from '../../lib/helpers/platform';

/** Helpers */
import { ScreenWrapper } from '../utility/ScreenWrapper';

const styles = StyleSheet.create({
  authContainer: {
    flex: 1
  }
});

export default function AccountComponent() {
  useEffect(() => {
    AsyncStorage.getAllKeys()
      .then((keys) => {
        if (keys.length) {
          AsyncStorage.clear();
        }
      })
      .catch(logError);
  }, []);

  return (
    <ScreenWrapper title={screenTitles.account.ACCOUNT} hideBackButton={true}>
      <View style={styles.authContainer}>
        <Text>hello</Text>
      </View>
    </ScreenWrapper>
  );
}
