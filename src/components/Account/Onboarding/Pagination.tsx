import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { colors } from '../../../lib/styles';

const styles = StyleSheet.create({
  paginationContainer: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paginationStep: {
    backgroundColor: colors.main.gray10,
    width: 20,
    height: 4,
    margin: 5,
    borderRadius: 2
  },
  animatedIndicator: {
    width: '100%',
    height: 4,
    backgroundColor: colors.main.primaryLight,
    alignSelf: 'flex-start'
  }
});

interface PaginationStepProps {
  index?: number;
  currentIndex?: number;
}

const PaginationStep: React.FC<PaginationStepProps> = ({
  index,
  currentIndex
}) => {
  const scaleXIndicator = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const isSelected = index === currentIndex;

    Animated.timing(scaleXIndicator, {
      useNativeDriver: true,
      duration: 250,
      toValue: isSelected ? 1 : 0,
      easing: Easing.exp
    }).start();
  }, [index, currentIndex]);

  return (
    <View style={styles.paginationStep}>
      <Animated.View
        style={[
          styles.animatedIndicator,
          {
            opacity: scaleXIndicator,
            transform: [{ scaleX: scaleXIndicator }]
          }
        ]}
      />
    </View>
  );
};

export const Pagination: React.FC<Partial<PaginationStepProps>> = ({
  currentIndex
}) => {
  return (
    <View style={styles.paginationContainer}>
      <PaginationStep index={0} currentIndex={currentIndex} />
      <PaginationStep index={1} currentIndex={currentIndex} />
      <PaginationStep index={2} currentIndex={currentIndex} />
    </View>
  );
};
