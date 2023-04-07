import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Image, StyleSheet, Text, View } from 'react-native';
import { upperFirst } from 'lodash';

// *** Helpers ***//
import { colors, fonts } from '../lib/styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SearchStackParamList } from './SymptomSearchScreen';
import { ScreenWrapper } from '../components/utility/ScreenWrapper';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    display: 'flex'
  },
  header: {
    flex: 2
  },
  headerImage: {
    flex: 1,
    resizeMode: 'cover'
  },
  content: {
    flex: 3,
    backgroundColor: colors.main.white
  },
  contentInfoGroup: {
    flex: 2
  },
  contentHeader: {
    fontSize: 36,
    fontFamily: fonts.CrimsonProLight,
    marginTop: 20,
    paddingHorizontal: 16
  },
  contentDescription: {
    fontSize: 14,
    fontFamily: fonts.NunitoSansRegular,
    marginTop: 12,
    paddingLeft: 16,
    paddingRight: 8
  },
  carouselPreText: {
    fontSize: 16,
    fontFamily: fonts.NunitoSansLight,
    textAlign: 'center'
  },
  carouselPreTextHighlight: {
    color: colors.main.primary,
    textDecorationLine: 'underline'
  },
  carouselGroup: {
    flex: 3
  }
});

export type SymptomInfoProps = NativeStackScreenProps<
  SearchStackParamList,
  'SymptomInfo',
  'SearchStack'
>;

const animatedOffsetY = -32;

const SymptomInfo = ({ route, navigation }: SymptomInfoProps) => {
  const { symptom } = route.params;
  const opacity = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(animatedOffsetY)).current;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      Animated.parallel([
        Animated.timing(opacity, {
          useNativeDriver: true,
          duration: 500,
          toValue: 1,
          easing: Easing.inOut(Easing.ease)
        }),
        Animated.timing(translateX, {
          useNativeDriver: true,
          duration: 500,
          toValue: 0,
          easing: Easing.out(Easing.ease)
        })
      ]).start();
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  return (
    <ScreenWrapper title={'hello'}>
      <View style={styles.container}>
        <Animated.View style={styles.header}>
          <Image
            style={styles.headerImage}
            source={{ uri: 'https://picsum.photos/200' }}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.content,
            {
              opacity,
              transform: [{ translateX }]
            }
          ]}
        >
          <View style={styles.contentInfoGroup}>
            <Text style={styles.contentHeader}>{upperFirst(symptom.name)}</Text>
            <Text style={styles.contentDescription}>{symptom.description}</Text>
          </View>
          <View style={styles.carouselGroup}>
            <Text style={styles.carouselPreText}>
              Food that may relieve{' '}
              <Text style={styles.carouselPreTextHighlight}>
                {upperFirst(symptom.name)}
              </Text>
            </Text>
          </View>
        </Animated.View>
      </View>
    </ScreenWrapper>
  );
};

export default SymptomInfo;
