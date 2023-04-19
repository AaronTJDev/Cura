import React, { useContext, useState } from 'react';
import {
  ActivityIndicator,
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
  const { isLoading } = useContext(SearchContext);
  const [activeIndex, setActiveIndex] = useState<number | undefined>();

  return (
    <View style={styles.container}>
      <ScrollView
        style={[styles.resultsContainer]}
        contentInset={{ bottom: 80 }}
      >
        {isLoading && <ActivityIndicatorView />}
        {suggestions?.length >= 0 &&
          suggestions.map((suggestion: ISymptom, index) => {
            return (
              <SearchResult
                data={suggestion}
                index={index}
                setActiveIndex={setActiveIndex}
                activeIndex={activeIndex}
                isLastItem={index === suggestions.length - 1}
              />
            );
          })}
      </ScrollView>
      <BlurView
        style={styles.blur}
        blurAmount={1}
        blurRadius={10}
        blurType={'light'}
      >
        <TouchableOpacity style={styles.continueCta}>
          <Text style={styles.continueCtaText}>Continue</Text>
        </TouchableOpacity>
      </BlurView>
    </View>
  );
};
