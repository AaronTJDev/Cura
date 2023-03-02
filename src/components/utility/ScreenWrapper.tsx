import React, { useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome';
import { assetResolver } from '../../lib/assetResolver';
import { colors, fonts } from '../../lib/styles';

type ScreenWrapperProps = {
  children: React.ReactNode;
  title: string;
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    padding: 40,
    marginTop: 40,
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
    fontWeight: 'bold',
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
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 1,
    zIndex: 1
  },
  imageBg: {
    flex: 1,
    resizeMode: 'cover'
  }
});

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  title
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerBackground: null,
      header: () => (
        <View style={styles.header}>
          <View style={styles.backButton}>
            <TouchableOpacity onPress={navigation.goBack}>
              <Icon icon="arrow-left" color={colors.main.white} size={20} />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>{title}</Text>
        </View>
      )
    });
  }, [navigation, title]);

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: 0,
          paddingLeft: insets.left,
          paddingRight: insets.right
        }
      ]}
    >
      <ImageBackground
        style={styles.imageBg}
        imageStyle={{ alignSelf: 'center' }}
        source={assetResolver.images.mainBg}
      >
        <ScrollView
          style={[styles.scrollViewContainer, { marginTop: insets.top * 3.2 }]}
        >
          {children}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};
