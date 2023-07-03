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
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../lib/constants';
import { navigate, routeNames } from '../../../lib/helpers/navigation';
import { colors, fonts } from '../../../lib/styles';
import { OnboardingLogo } from './OnboardingLogo';
import { Pagination } from './Pagination';
import Checkbox from '../../utility/Checkbox';
import Footer from '../../utility/Footer';
import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorageKeys } from '../../../lib/asyncStorage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main.white
  },
  scrollView: {
    height: SCREEN_HEIGHT,
    width: '100%'
  },
  contentContainer: {
    flexGrow: 1,
    width: SCREEN_WIDTH
  },
  carouselContainer: {
    height: SCREEN_HEIGHT,
    flexDirection: 'row',
    width: '100%'
  },
  carouselImageContainer: {
    height: 300,
    alignItems: 'center'
  },
  carouselImage: {
    width: '100%',
    height: '100%'
  },
  carouselTextContainer: {
    width: SCREEN_WIDTH * 0.8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  carouselText: {
    color: colors.main.black,
    textAlign: 'center',
    width: '100%',
    fontFamily: fonts.ComfortaaLight,
    letterSpacing: 1,
    fontSize: 12,
    lineHeight: 16
  },
  carouselButtonContainer: {
    alignItems: 'center',
    paddingVertical: 20
  },
  carouselButton: {
    width: '92%',
    height: 50,
    backgroundColor: colors.main.primary,
    borderRadius: 5,
    justifyContent: 'center'
  },
  carouselButtonText: {
    fontFamily: fonts.ComfortaaBold,
    fontSize: 18,
    color: colors.main.white,
    textAlign: 'center'
  },
  pageContainer: {
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  consentContainer: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 40,
    paddingVertical: 8,
    marginTop: 40,
    justifyContent: 'space-between',
    alignContent: 'space-between'
  },
  consentText: {
    flex: 4,
    marginLeft: 16,
    top: -2,
    fontFamily: fonts.CrimsonProMedium,
    fontSize: 12,
    height: 300
  }
});

interface OnboardingPageProps {
  paragraphText: string;
  buttonText: string;
  image: ImageURISource;
  currentPage: number;
  page: number;
  onChange: (isChecked: boolean) => void;
  isChecked: boolean;
}

type OnboardingPages = Omit<
  OnboardingPageProps,
  'currentPage' | 'onChange' | 'isChecked'
>;

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
      'The information provided within this app is not a substitute for professional medical advice, diagnosis, or treatment. Please consult a qualified healthcare professional before making any decisions or taking any actions based on the information provided.',
    buttonText: 'Get Started',
    image: assetResolver.images.onboardingC,
    page: 2
  }
];

const OnboardingPage: React.FC<OnboardingPageProps> = ({
  paragraphText,
  image,
  currentPage,
  page,
  isChecked,
  onChange
}) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const [showContent, setShowContent] = useState<boolean>(false);

  useEffect(() => {
    const isSelectedPage = page === currentPage;
    setShowContent(false);

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
    }).start(() => setShowContent(true));
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
      <ScrollView contentContainerStyle={styles.pageContainer}>
        <View style={styles.carouselTextContainer}>
          <Text style={styles.carouselText}>{paragraphText}</Text>
        </View>
        {currentPage === 2 && showContent && (
          <>
            <View style={styles.consentContainer}>
              <Checkbox onChange={onChange} isChecked={!!isChecked} />
              <Text style={styles.consentText}>
                I have read, understood, and agree to the Privacy Policy and
                Terms of Use. By checking this box, I acknowledge that I have
                reviewed and accepted the terms and conditions outlined in these
                documents.
              </Text>
            </View>
            <View style={{ position: 'absolute', bottom: 0 }}>
              <Footer />
            </View>
          </>
        )}
      </ScrollView>
    </Animated.View>
  );
};

export const OnboardingModal: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const navigation = useNavigation();

  const handleNext = async () => {
    if (currentPage !== 2) {
      setCurrentPage((curr) => curr + 1);
    } else {
      await AsyncStorage.setItem(AsyncStorageKeys.COMPLETED_FTUE, 'true');
      navigation.goBack();
      navigate(routeNames.account.SIGNUP);
    }
  };

  return (
    <View style={styles.container}>
      <OnboardingLogo />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.carouselContainer}
        showsVerticalScrollIndicator={false}
      >
        {onboardingPages.map((page, id) => (
          <OnboardingPage
            key={id}
            currentPage={currentPage}
            {...page}
            isChecked={isChecked}
            onChange={setIsChecked}
          />
        ))}
      </ScrollView>
      <Pagination currentIndex={currentPage} />
      <View style={styles.carouselButtonContainer}>
        <TouchableOpacity
          onPress={handleNext}
          style={[
            styles.carouselButton,
            currentPage === 2 && !isChecked && { opacity: 0.5 }
          ]}
          disabled={currentPage === 2 ? !isChecked : false}
        >
          <Text style={styles.carouselButtonText}>
            {onboardingPages[currentPage].buttonText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
