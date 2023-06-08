import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  ImageURISource,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { assetResolver } from '../../../lib/assetResolver';
import { SCREEN_WIDTH } from '../../../lib/constants';
import { navigate, routeNames } from '../../../lib/helpers/navigation';
import { colors, fonts } from '../../../lib/styles';
import { OnboardingLogo } from './OnboardingLogo';
import { Pagination } from './Pagination';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main.white
  },
  contentContainer: {
    flexGrow: 1,
    width: SCREEN_WIDTH
  },
  carouselContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%'
  },
  carouselImageContainer: {
    flex: 4,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  carouselImage: {
    width: '100%',
    height: '100%'
  },
  carouselTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: fonts.ComfortaaBold
  },
  carouselText: {
    color: colors.main.black,
    textAlign: 'center',
    width: '84%'
  },
  carouselButtonContainer: {
    flex: 0.2,
    alignItems: 'center'
  },
  carouselButton: {
    width: '92%',
    height: 50,
    backgroundColor: colors.main.primary,
    borderRadius: 14,
    justifyContent: 'center'
  },
  carouselButtonText: {
    fontFamily: fonts.ComfortaaBold,
    fontSize: 18,
    color: colors.main.white,
    textAlign: 'center'
  }
});

interface OnboardingPageProps {
  paragraphText: string;
  buttonText: string;
  image: ImageURISource;
  currentPage: number;
  page: number;
}

type OnboardingPages = Omit<OnboardingPageProps, 'currentPage'>;

const onboardingPages: OnboardingPages[] = [
  {
    paragraphText:
      'Discover symptom-specific food recommendations to nourish your body and alleviate discomfort.',
    buttonText: 'Next',
    image: assetResolver.images.onboardingA,
    page: 0
  },
  {
    paragraphText:
      'Explore a curated list of foods that can support your health goals and help you to make informed choices for a happier, healthier you.',
    buttonText: 'Next',
    image: assetResolver.images.onboardingB,
    page: 1
  },
  {
    paragraphText:
      'The information provided within this app is not a substitute for professional medical advice, diagnosis, or treatment. Please consult a qualified healthcare professional before making any decisions or taking any actions based on the information provided. For a comprehensive understanding of our policies, including our medical disclaimer, privacy policy, and terms of use, please refer to the respective links provided.',
    buttonText: 'Get Started',
    image: assetResolver.images.onboardingC,
    page: 2
  }
];

const OnboardingPage: React.FC<OnboardingPageProps> = ({
  paragraphText,
  image,
  currentPage,
  page
}) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const isSelectedPage = page === currentPage;

    Animated.timing(translateX, {
      useNativeDriver: true,
      toValue: currentPage * -SCREEN_WIDTH,
      duration: 500
    }).start();
    Animated.timing(opacity, {
      useNativeDriver: true,
      toValue: isSelectedPage ? 1 : 0,
      duration: 500,
      easing: Easing.exp
    }).start();
  }, [currentPage]);

  return (
    <Animated.View
      style={[
        styles.contentContainer,
        {
          transform: [{ translateX }],
          opacity
        }
      ]}
    >
      <View style={styles.carouselImageContainer}>
        <Image style={styles.carouselImage} source={image} resizeMode="cover" />
      </View>
      <ScrollView style={{ top: 64 }}>
        <View style={styles.carouselTextContainer}>
          <Text style={styles.carouselText}>{paragraphText}</Text>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

export const OnboardingModal: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const navigation = useNavigation();

  const handleNext = () => {
    if (currentPage !== 2) {
      setCurrentPage((curr) => curr + 1);
    } else {
      navigation.goBack();
      navigate(routeNames.account.SIGNUP);
    }
  };

  return (
    <View style={styles.container}>
      <OnboardingLogo />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.carouselContainer}
      >
        {onboardingPages.map((page, id) => (
          <OnboardingPage key={id} currentPage={currentPage} {...page} />
        ))}
      </ScrollView>
      <Pagination currentIndex={currentPage} />
      <View style={styles.carouselButtonContainer}>
        <TouchableOpacity onPress={handleNext} style={styles.carouselButton}>
          <Text style={styles.carouselButtonText}>
            {onboardingPages[currentPage].buttonText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
