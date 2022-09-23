import { BlurView } from '@react-native-community/blur';
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { SearchContext } from '.';
import { SCREEN_HEIGHT } from '../../lib/constants';
import { colors } from '../../lib/styles';

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
    borderWidth: 1
  },
  blur: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%'
  }
});

const DiseasesModal = () => {
  const { selectedSymptoms } = useContext(SearchContext);

  return (
    <>
      {!!selectedSymptoms && [...selectedSymptoms].length > 0 && (
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}/>
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
