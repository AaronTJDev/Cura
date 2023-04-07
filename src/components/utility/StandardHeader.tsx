import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome';

// *** Helpers *** //
import { colors, fonts } from '../../lib/styles';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { toSafeInteger } from 'lodash-es';
import { SCREEN_HEIGHT } from '../../lib/constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    height: 200,
    width: '100%',
    top: 250
  },
  header: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 24,
    paddingVertical: 32,
    marginTop: toSafeInteger(SCREEN_HEIGHT * 0.025),
    bottom: 0
  },
  backButton: {
    flex: 1,
    marginRight: 10
  },
  backButtonIcon: {
    fontSize: 240
  },
  title: {
    flex: 1,
    fontSize: 36,
    color: colors.main.white,
    fontFamily: fonts.CrimsonProBold,
    marginTop: 16
  }
});

interface StandardHeaderProps extends NativeStackHeaderProps {
  hideBackButton?: boolean;
  title: string;
}

const StandardHeader = (props: StandardHeaderProps) => {
  const { hideBackButton, navigation, title } = props;

  return (
    <View style={styles.header}>
      <View style={styles.backButton}>
        {!hideBackButton ? (
          <TouchableOpacity onPress={navigation.goBack}>
            <Icon icon="arrow-left" color={colors.main.white} size={20} />
          </TouchableOpacity>
        ) : null}
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default StandardHeader;
