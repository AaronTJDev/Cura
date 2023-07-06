import { startCase } from 'lodash-es';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, fonts } from '../../lib/styles';
import { Food } from '../../lib/types/database';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontFamily: fonts.ComfortaaBold,
    fontSize: 14,
    color: colors.main.primaryLight,
    flex: 1,
    marginVertical: 8
  },
  divider: {
    borderBottomColor: colors.main.gray10,
    borderBottomWidth: 1
  }
});

interface ContentCardProps {
  data: Food;
  isLast: boolean;
}

const ContentCard = ({ data, isLast }: ContentCardProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text ellipsizeMode="tail" style={styles.title}>
          {startCase(data.description.toLowerCase())}
        </Text>
      </TouchableOpacity>
      <View style={[styles.divider, isLast && { borderBottomWidth: 0 }]} />
    </View>
  );
};

export default ContentCard;
