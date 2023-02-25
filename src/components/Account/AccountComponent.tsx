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

const styles = StyleSheet.create({});

export default function AccountComponent(props: any) {
  const { navigation } = props;

  const handleLoginModal = () => {
    navigation.navigate(routeNames.account.LOGIN);
  };

  const handleSignupModal = () => {
    navigation.navigate(routeNames.account.SIGNUP);
  };

  return <></>;
}
