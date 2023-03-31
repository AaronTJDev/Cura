import React, { useLayoutEffect } from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  ViewStyle,
  KeyboardAvoidingView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { toSafeInteger } from 'lodash-es';

import { assetResolver } from '../../lib/assetResolver';
import { colors, fonts } from '../../lib/styles';
import { SCREEN_HEIGHT } from '../../lib/constants';

type MaybeAnimated<T> = T | Animated.Value;
type AnimatedScalar = string | number;

type AnimatedStyle<T> = {
  [Key in keyof T]: T[Key] extends AnimatedScalar
    ? MaybeAnimated<T[Key]>
    : T[Key] extends Array<infer U>
    ? Array<AnimatedStyle<U>>
    : AnimatedStyle<T[Key]>;
};

type ScreenWrapperProps = {
  children: React.ReactNode;
  title: string;
  hideHeader?: boolean;
  hideBackButton?: boolean;
  expandedContentArea?: boolean;
  style?: AnimatedStyle<ViewStyle>;
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 24,
    paddingVertical: 32,
    marginTop: toSafeInteger(SCREEN_HEIGHT * 0.025),
    bottom: 0
  },
  backButton: {
    flex: 1,
    marginRight: 10
  },
  backButtonIcon: {
    fontSize: 240
  },
  title: {
    flex: 1,
    fontSize: 36,
    color: colors.main.white,
    fontFamily: fonts.CrimsonProBold,
    marginTop: 16
  },
  container: {
    flex: 1
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingVertical: SCREEN_HEIGHT / 24,
    marginTop: SCREEN_HEIGHT / 5
  },
  imageBg: {
    flex: 1,
    resizeMode: 'cover'
  }
});

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  title,
  hideHeader,
  hideBackButton,
  expandedContentArea
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerBackground: null,
      header: () =>
        !hideHeader ? (
          <View style={styles.header}>
            <View style={styles.backButton}>
              {!hideBackButton ? (
                <TouchableOpacity onPress={navigation.goBack}>
                  <Icon icon="arrow-left" color={colors.main.white} size={20} />
                </TouchableOpacity>
              ) : null}
            </View>
            <Text style={styles.title}>{title}</Text>
          </View>
        ) : null
    });
  }, [navigation, title]);

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        {
          paddingTop: 0,
          paddingLeft: toSafeInteger(insets.left),
          paddingRight: toSafeInteger(insets.right)
        }
      ]}
    >
      <ImageBackground
        style={styles.imageBg}
        source={assetResolver.images.mainBg}
      >
        <ScrollView
          style={[
            styles.scrollViewContainer,
            expandedContentArea ? { marginTop: SCREEN_HEIGHT / 6 } : {}
          ]}
          contentContainerStyle={styles.container}
        >
          {children}
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};