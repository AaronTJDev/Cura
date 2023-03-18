import React from 'react';
import { StyleSheet, View } from 'react-native';
import { screenTitles } from '../../lib/helpers/navigation';

/** Helpers */
import { ScreenWrapper } from '../utility/ScreenWrapper';

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default function AccountComponent() {
  return (
    <ScreenWrapper
      title={screenTitles.account.ACCOUNT}
      hideBackButton
      expandedContentArea
    >
      <View style={styles.container} />
    </ScreenWrapper>
  );
}
