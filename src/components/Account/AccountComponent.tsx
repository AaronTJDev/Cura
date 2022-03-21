import React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { IconName } from '@fortawesome/fontawesome-svg-core';

/** Components */
import SocialCTA from './SocialCTA';

/** Helpers */
import { assetResolver } from '../../lib/assetResolver';
import { colors, fonts } from '../../lib/styles';

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
  },
  loginGroupContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: '66%',
    resizeMode: 'contain'
  },
  emailAuthContainer: {
    flexDirection: 'row',
    width: '66%',
    marginTop: 32,
    justifyContent: 'space-around'
  },
  authText: {
    color: colors.main.primaryDark,
    fontFamily: fonts.CrimsonProBold,
    fontSize: 18,
    textDecorationLine: 'underline'
  }
});

export default function AccountComponent(props: any) {
  const { navigation } = props;
  const handleNavigate = (screen: string) => {
    console.log(screen, props);
    navigation.navigate(screen);
  }

  return (
    <LinearGradient
      style={styles.gradient}
      colors={[colors.main.white,colors.main.white,colors.main.primaryLight]}
      start={{x: 0, y:0}}
      end={{x:0, y:1.25}}
    >
      <View style={styles.loginGroupContainer}>
        <Image
          style={styles.logo}
          source={assetResolver.images.logo}
        />
        <SocialCTA brandIconName={'Apple' as IconName}/>
        <SocialCTA brandIconName={'Google' as IconName}/>
        <SocialCTA brandIconName={'Facebook' as IconName}/>
        <View style={styles.emailAuthContainer}>
          <TouchableOpacity
            onPress={() => handleNavigate('Login')}
          >
            <Text style={styles.authText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleNavigate('Signup')}
          >
            <Text style={styles.authText}>Sign Up With Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  )
};
