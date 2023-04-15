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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 32,
    marginTop: toSafeInteger(SCREEN_HEIGHT * 0.025),
    bottom: 0
  },
  iconContainer: {
    flex: 1,
    marginRight: 10
  },
  iconRight: {
    alignItems: 'flex-end'
  },
  iconCta: {
    paddingHorizontal: 16,
    backgroundColor: colors.main.white,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 48
  },
  title: {
    flex: 2,
    fontSize: 18,
    color: colors.main.white,
    fontFamily: fonts.CrimsonProBold,
    textAlign: 'center'
  }
});

interface SearchHeaderProps extends NativeStackHeaderProps {
  title: string;
  renderSort: () => void;
  renderFilter: () => void;
}

const SearchHeader = (props: SearchHeaderProps) => {
  const { title, renderFilter, renderSort } = props;

  return (
    <View style={styles.header}>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconCta} onPress={renderSort}>
          <Icon icon="bars" color={colors.main.secondary} size={16} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={[styles.iconContainer, styles.iconRight]}>
        <TouchableOpacity style={styles.iconCta} onPress={renderFilter}>
          <Icon icon="filter" color={colors.main.secondary} size={16} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchHeader;
