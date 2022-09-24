import { BlurView } from '@react-native-community/blur';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SearchContext } from '.';
import { SCREEN_HEIGHT } from '../../lib/constants';
import { fetchRelatedDiseases } from '../../lib/datasource';
import { colors, fonts } from '../../lib/styles';

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    bottom: 24,
    zIndex: 25,
    height: SCREEN_HEIGHT / 6,
    width: '100%',
    justifyContent: 'center'
  },
  innerContainer: {
    alignSelf: 'center',
    width: '75%',
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
    marginVertical: 16
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
  }
});

export interface IDisease {
  name: string;
  description: string;
}

const DiseasesModal = () => {
  const { selectedSymptoms } = useContext(SearchContext);
  const [diseases, setDiseases] = useState<IDisease[]>();

  const getRelatedDiseases = useCallback(() => {
    if (selectedSymptoms?.size) {
      fetchRelatedDiseases([...selectedSymptoms])
        .then((diseaseData) => {
          if (diseaseData) setDiseases(diseaseData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedSymptoms]);

  useEffect(() => {
    getRelatedDiseases();
  }, [selectedSymptoms]);

  return (
    <>
      {!!selectedSymptoms && selectedSymptoms.size > 0 && (
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <Text style={styles.modalText}>
              Found ({diseases?.length || 0}) illnesses related to your (
              {selectedSymptoms.size}) symptoms
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
        </View>
      )}
    </>
  );
};

export default DiseasesModal;
