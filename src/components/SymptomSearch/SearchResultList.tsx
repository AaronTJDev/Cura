import React, { useContext, useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { BlurView } from '@react-native-community/blur';

//** Components **/
import { SearchContext } from '../../screens/SymptomSearchScreen';
import { SearchResult } from './SearchResult';

//** Helpers **/
import { colors, fonts } from '../../lib/styles';
import { navigate, routeNames } from '../../lib/helpers/navigation';

const styles = StyleSheet.create({
  container: {
    flex: 9,
    marginTop: 16
  },
  resultsContainer: {
    flex: 1
  },
  activityIndicatorView: {
    marginHorizontal: 8
  },
  blur: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  continueCta: {
    width: '92%',
    height: 50,
    backgroundColor: colors.main.primary,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center'
  },
  continueCtaText: {
    fontFamily: fonts.ComfortaaBold,
    fontSize: 20,
    color: colors.main.white
  }
});

const ActivityIndicatorView = () => {
  return (
    <View style={styles.activityIndicatorView}>
      <ActivityIndicator />
    </View>
  );
};

export interface ISymptom {
  id: string;
  name: string;
  description: string;
}

interface SearchResultListProps {
  suggestions: ISymptom[];
}

export const SearchResultList: React.FC<SearchResultListProps> = ({
  suggestions
}) => {
  const { isLoading, selectedSymptoms } = useContext(SearchContext);
  const ctaAnimation = useRef(new Animated.Value(0)).current;

  const handleContinue = () => {
    if (selectedSymptoms) {
      const symptoms = Array.from(selectedSymptoms);
      navigate(routeNames.search.FOOD_SUGGESTIONS, { symptoms });
    }
  };

  useEffect(() => {
    Animated.timing(ctaAnimation, {
      useNativeDriver: true,
      toValue: selectedSymptoms?.size ? 1 : 0,
      duration: 300
    }).start();
  }, [selectedSymptoms]);

  return (
    <View style={styles.container}>
      <ScrollView
        style={[styles.resultsContainer]}
        contentInset={{ bottom: 80 }}
      >
        {isLoading && <ActivityIndicatorView />}
        {suggestions?.length >= 0 ? (
          suggestions.map((suggestion: ISymptom, index) => {
            return (
              <SearchResult
                key={`sr-${index}`}
                data={suggestion}
                index={index}
                isLastItem={index === suggestions.length - 1}
              />
            );
          })
        ) : (
          <></>
        )}
      </ScrollView>
      <BlurView
        style={styles.blur}
        blurAmount={1}
        blurRadius={10}
        blurType={'light'}
      >
        <Animated.View
          style={{
            width: '100%',
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: ctaAnimation,
            transform: [
              {
                translateY: ctaAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0]
                })
              }
            ]
          }}
        >
          <TouchableOpacity style={styles.continueCta} onPress={handleContinue}>
            <Text style={styles.continueCtaText}>Continue</Text>
          </TouchableOpacity>
        </Animated.View>
      </BlurView>
    </View>
  );
};
