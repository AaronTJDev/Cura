import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { IconName } from '@fortawesome/fontawesome-svg-core';

/** Components */
import SocialCTA from './SocialCTA';

/** Helpers */
import { assetResolver } from '../../lib/assetResolver';
import { colors, fonts } from '../../lib/styles';
import { routeNames } from '../../lib/helpers/navigation';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../lib/constants';

const styles = StyleSheet.create({
  loginGroupContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bgImage: {
    position: 'absolute',
    width: '130%',
    height: '130%',
    right: 160,
    bottom: 20
  },
  bgOverlay: {
    position: 'absolute',
    backgroundColor: '#000000',
    opacity: 0.5,
    zIndex: 2,
    width: '100%',
    height: '100%'
  },
  logoContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 3
  },
  logo: {
    width: '33%',
    top: 48,
    resizeMode: 'contain'
  },
  socialAuthContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3
  },
  emailAuthContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '66%',
    marginTop: 32,
    justifyContent: 'space-around',
    zIndex: 3
  },
  authText: {
    color: colors.main.white,
    fontFamily: fonts.CrimsonProBold,
    fontSize: 18,
    textDecorationLine: 'underline',
    zIndex: 3
  }
});

export default function AccountComponent(props: any) {
  const { navigation } = props;

  const handleLoginModal = () => {
    navigation.navigate(routeNames.account.LOGIN);
  };

  const handleSignupModal = () => {
    navigation.navigate(routeNames.account.SIGNUP);
  };

  return (
    <View style={styles.loginGroupContainer}>
      <ImageBackground
        style={styles.bgImage}
        source={assetResolver.images.authBg}
        imageStyle={{
          alignSelf: 'flex-end',
          resizeMode: 'cover'
        }}
      />
      <View style={styles.bgOverlay} />
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={assetResolver.images.logo} />
      </View>
      <View style={styles.socialAuthContainer}>
        <SocialCTA brandIconName={'Apple' as IconName} />
        <SocialCTA brandIconName={'Google' as IconName} />
        <SocialCTA brandIconName={'Facebook' as IconName} />
      </View>
      <View style={styles.emailAuthContainer}>
        <TouchableOpacity onPress={handleLoginModal}>
          <Text style={styles.authText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignupModal}>
          <Text style={styles.authText}>Sign Up With Email</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
