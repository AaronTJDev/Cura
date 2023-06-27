import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle
} from 'react-native';
import { colors, fonts } from '../../lib/styles';

interface CTAProps {
  isEnabled: boolean;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  onPress: () => void;
  isDarkTheme: boolean;
  text: string;
}

const CTA: React.FC<CTAProps> = ({
  isEnabled,
  buttonStyle,
  textStyle,
  onPress,
  isDarkTheme,
  text
}) => {
  const buttonColor = isDarkTheme ? 'dark' : 'light';

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle, styles[`${buttonColor}Button`]]}
      onPress={onPress}
      disabled={!isEnabled}
    >
      <Text style={[styles.text, textStyle, styles[`${buttonColor}Text`]]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50
  },
  darkButton: {
    backgroundColor: colors.main.primary
  },
  lightButton: {
    backgroundColor: colors.main.white
  },
  text: {
    fontFamily: fonts.ComfortaaBold
  },
  darkText: {
    color: colors.main.white
  },
  lightText: {
    color: colors.main.primary
  }
});

export default CTA;
