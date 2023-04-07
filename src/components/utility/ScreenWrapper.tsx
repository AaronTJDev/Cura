import React, { useLayoutEffect } from 'react';
import {
  Animated,
  StyleSheet,
  ImageBackground,
  ScrollView,
  ViewStyle,
  KeyboardAvoidingView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { toSafeInteger } from 'lodash-es';

import { assetResolver } from '../../lib/assetResolver';
import { SCREEN_HEIGHT } from '../../lib/constants';
import StandardHeader from './StandardHeader';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import SearchHeader from './SearchHeader';

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
  mode?: 'standard' | 'search';
};

const styles = StyleSheet.create({
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
  expandedContentArea,
  mode
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const renderHeader = (props: NativeStackHeaderProps) => {
    mode = mode;
    switch (mode) {
      case 'search':
        return (
          <SearchHeader
            title={title}
            renderFilter={() => {}}
            renderSort={() => {}}
            {...props}
          />
        );
      default:
        return (
          <StandardHeader
            hideBackButton={hideBackButton}
            title={title}
            {...props}
          />
        );
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerBackground: null,
      header: (props: NativeStackHeaderProps) =>
        !hideHeader ? renderHeader(props) : null
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
