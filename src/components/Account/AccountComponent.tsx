import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

/** Helpers */
import { ScreenWrapper } from '../utility/ScreenWrapper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const styles = StyleSheet.create({
  authContainer: {
    flex: 1
  }
});

export default function AccountComponent(props: NativeStackScreenProps<any>) {
  console.log(props);
  return (
    <ScreenWrapper title={'Sign Up'}>
      <View style={styles.authContainer}>
        <Text>hello</Text>
      </View>
    </ScreenWrapper>
  );
}
