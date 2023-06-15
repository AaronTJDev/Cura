import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, fonts } from '../../lib/styles';
import { SCREEN_HEIGHT } from '../../lib/constants';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text style={styles.link}>Privacy Policy</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.link}>Terms of Use</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    top: 40,
    paddingHorizontal: SCREEN_HEIGHT * 0.05
  },
  link: {
    color: colors.main.primaryLight,
    fontFamily: fonts.CrimsonProLight
  }
});

export default Footer;
