import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

/** Components */
import SignupForm from './Forms/SignupForm';

/** Helpers */
import { assetResolver } from '../../lib/assetResolver';
import { colors, fonts } from '../../lib/styles';

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
  },
  signupGroupContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 120,
  },
  logo: {
    width: '66%',
    resizeMode: 'contain',
  },
  emailAuthContainer: {
    flexDirection: 'row',
    width: '66%',
    marginTop: 32,
    justifyContent: 'space-around',
  },
  authText: {
    color: colors.main.primaryDark,
    fontFamily: fonts.CrimsonProBold,
    fontSize: 18,
    textDecorationLine: 'underline',
  },
  formContainer: {
    width: '66%',
    alignItems: 'center',
  },
  formInputView: {
    marginTop: 32,
    borderBottomColor: colors.main.primaryDark,
    borderWidth: 1,
  },
  formInput: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    fontFamily: fonts.CrimsonProRegular,
  },
});

export default function SignupComponent() {
  return (
    <LinearGradient
      style={styles.gradient}
      colors={[colors.main.white, colors.main.white, colors.main.primaryLight]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1.25 }}>
      <View style={styles.signupGroupContainer}>
        <Image style={styles.logo} source={assetResolver.images.logo} />
        <SignupForm />
      </View>
    </LinearGradient>
  );
}
