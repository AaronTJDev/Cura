import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { colors } from '../../../lib/styles';

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 100,
    shadowColor: colors.main.gray25,
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowRadius: 4,
    shadowOpacity: 0.5,
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 14
  },
  logo: {}
});

interface SocialCtaProps {
  image: ImageSourcePropType;
}

export const SocialCta: React.FC<SocialCtaProps> = ({ image }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={image} style={styles.logo} />
    </TouchableOpacity>
  );
};
