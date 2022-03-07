import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';

/** Helpers */
import { colors, fonts } from '../../lib/styles';

const styles = StyleSheet.create({
  buttonContainer: {
    borderColor: colors.main.primaryDark,
    borderWidth: 2,
    width: '66%',
    height: 48,
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonIcon: {
    marginRight: 8,
    marginLeft: 12
  },
  buttonText: {
    flex: 40,
    color: colors.main.primaryDark,
    fontFamily: fonts.NunitoSansBold,
    fontSize: 16,
    marginTop: 2,
    marginLeft: 12
  }
})

interface SocialCTAProps {
  brandIconName: IconName;
  color?: string;
}

export default function SocialCTA(props: SocialCTAProps) {
  const { brandIconName } = props;

  return (
    <TouchableOpacity
      style={styles.buttonContainer}  
    >
      <Icon
        icon={['fab', brandIconName.toLowerCase() as IconName]}
        size={25}
        color={colors.main.primaryDark}
        style={styles.buttonIcon}
      />
      <Text style={styles.buttonText}>Sign Up With {brandIconName}</Text>
    </TouchableOpacity>
  )
}
