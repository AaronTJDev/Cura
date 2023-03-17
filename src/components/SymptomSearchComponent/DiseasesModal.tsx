import { BlurView } from '@react-native-community/blur';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

/** Components */
import { SearchContext } from '../../screens/SymptomSearch';

/** Helpers */
import { SCREEN_HEIGHT } from '../../lib/constants';
import { fetchRelatedDiseases } from '../../lib/datasource';
import { colors, fonts } from '../../lib/styles';
import { logError } from '../../lib/helpers/platform';

const MODAL_HEIGHT = SCREEN_HEIGHT / 5;

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    bottom: 24,
    zIndex: 25,
    height: MODAL_HEIGHT,
    width: '100%',
    justifyContent: 'center'
  },
  innerContainer: {
    alignSelf: 'center',
    width: '80%',
    height: '80%',
    backgroundColor: colors.main.white,
    zIndex: 30,
    elevation: 1,
    shadowOffset: {
      height: 1,
      width: 1
    },
    shadowRadius: 4,
    shadowColor: colors.main.black,
    borderRadius: 4,
    borderColor: colors.main.gray10,
    borderWidth: 1,
    alignItems: 'center'
  },
  blur: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%'
  },
  modalText: {
    fontFamily: fonts.ComfortaaLight,
    fontSize: 14,
    marginVertical: 16,
    paddingHorizontal: 16
  },
  modalCta: {
    backgroundColor: colors.main.blue,
    width: '80%',
    height: 36,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ctaText: {
    color: colors.main.white,
    fontFamily: fonts.NunitoSansBold
  },
  textBold: {
    color: colors.main.gray50
  }
});

export interface IDisease {
  name: string;
  description: string;
}

const DiseasesModal = () => {
  const { selectedSymptoms } = useContext(SearchContext);
  const [diseases, setDiseases] = useState<IDisease[]>([]);
  const modalTranslateY = useRef(new Animated.Value(MODAL_HEIGHT)).current;
  const modalOpacity = useRef(new Animated.Value(0)).current;

  const getRelatedDiseases = useCallback(() => {
    if (selectedSymptoms?.size) {
      fetchRelatedDiseases([...selectedSymptoms])
        .then((diseaseData) => {
          if (diseaseData) setDiseases(diseaseData);
        })
        .catch((err) => {
          logError(err);
        });
    }
  }, [selectedSymptoms]);

  useEffect(() => {
    getRelatedDiseases();

    if (selectedSymptoms?.size && selectedSymptoms.size > 0) {
      Animated.parallel([
        Animated.timing(modalTranslateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.ease
        }),
        Animated.timing(modalOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.ease
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(modalTranslateY, {
          toValue: MODAL_HEIGHT,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.ease
        }),
        Animated.timing(modalOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.ease
        })
      ]).start();
    }
  }, [selectedSymptoms]);

  const pluralize = (
    array: any[],
    primaryWord: string,
    pluralizedEnding: string
  ) => {
    if (array.length > 1) {
      return primaryWord + pluralizedEnding;
    } else {
      return primaryWord;
    }
  };

  return (
    <>
      <Animated.View
        style={[
          styles.modalContainer,
          {
            transform: [{ translateY: modalTranslateY }],
            opacity: modalOpacity
          }
        ]}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.modalText}>
            Found
            <Text style={styles.textBold}>
              {' '}
              ({diseases?.length || 0}) {pluralize(diseases, 'disease', 's')}
            </Text>
            <Text> related to your</Text>
            {selectedSymptoms && selectedSymptoms?.size > 0 && (
              <Text style={styles.textBold}>
                {' '}
                ({selectedSymptoms?.size}){' '}
                {pluralize([...selectedSymptoms], 'symptom', 's')}
              </Text>
            )}
          </Text>
          <TouchableOpacity style={styles.modalCta}>
            <Text style={styles.ctaText}>VIEW ILLNESSES</Text>
          </TouchableOpacity>
        </View>
        <BlurView
          style={styles.blur}
          blurAmount={1}
          blurRadius={10}
          blurType={'light'}
        />
      </Animated.View>
    </>
  );
};

export default DiseasesModal;
