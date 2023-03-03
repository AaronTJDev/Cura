import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

/** Helpers */
import { ScreenWrapper } from '../utility/ScreenWrapper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  authContainer: {
    flex: 1
  }
});

export default function AccountComponent(props: NativeStackScreenProps<any>) {
  const insets = useSafeAreaInsets();
  console.log('props', props, insets);
  return (
    <ScreenWrapper title={'Account'}>
      <View style={styles.authContainer}>
        <Text>hello</Text>
      </View>
    </ScreenWrapper>
  );
}
