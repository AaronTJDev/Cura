import React, { useContext, useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome';

//** Helpers **/
import { colors, fonts } from '../../lib/styles';
import { ISearchResult } from './SearchResultList';
import { SearchContext } from '.';

const styles = StyleSheet.create({
  searchResult: {
    width: '80%',
    height: 48,
    shadowOffset: { height: 0, width: 1 },
    shadowColor: colors.main.gray25,
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 10,
    backgroundColor: colors.main.white,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    borderRadius: 8,
    marginVertical: 10
  },
  searchResultButtonContainer: {
    width: 24,
    height: 24,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    right: 16,
    top: 12
  },
  textGroup: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: 16,
    marginTop: 16
  },
  description: {
    flex: 2,
    flexWrap: 'wrap',
    justifyContent: 'flex-end'
  },
  searchTextButton: {
    flex: 1
  },
  searchResultText: {
    fontFamily: fonts.ComfortaaLight,
    color: colors.main.blue
  }
});

interface SearchResultProps {
  data: ISearchResult;
  index: number;
  activeIndex?: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
}

interface SymptomCTAProps {
  currentSymptom: string;
  selectedSymptoms?: Set<string>;
  handleToggleSymptom: () => void;
}

const SymptomCTA: React.FC<SymptomCTAProps> = ({
  handleToggleSymptom,
  selectedSymptoms,
  currentSymptom
}) => {
  return !selectedSymptoms?.has(currentSymptom) ? (
    <TouchableOpacity
      style={[
        styles.searchResultButtonContainer,
        { backgroundColor: colors.main.blue75 }
      ]}
      onPress={handleToggleSymptom}
    >
      <Icon icon="plus" color={colors.main.white} />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={[
        styles.searchResultButtonContainer,
        { backgroundColor: colors.main.red }
      ]}
      onPress={handleToggleSymptom}
    >
      <Icon icon="minus" color={colors.main.white} />
    </TouchableOpacity>
  );
};

const SearchResult: React.FC<SearchResultProps> = ({
  data,
  index,
  activeIndex,
  setActiveIndex
}) => {
  const isActive = useMemo(() => activeIndex === index, [activeIndex]);
  const { selectedSymptoms, setSelectedSymptoms } = useContext(SearchContext);

  const toggleShowDescription = () => {
    setActiveIndex(index);
    if (isActive) {
      setActiveIndex(undefined);
    }
  };

  const handleToggleSymptom = (): void => {
    if (!!selectedSymptoms && !!setSelectedSymptoms) {
      if (selectedSymptoms.has(data.name)) {
        setSelectedSymptoms(
          (prev) =>
            new Set([...prev].filter((symptom) => symptom !== data.name))
        );
      } else {
        setSelectedSymptoms((prev) => new Set(prev.add(data.name)));
      }
    }
  };

  return (
    <View style={[styles.searchResult, isActive && { height: 108 }]}>
      <View style={styles.textGroup}>
        <TouchableOpacity
          style={styles.searchTextButton}
          onPress={toggleShowDescription}
        >
          <Text style={styles.searchResultText}>{data.name}</Text>
        </TouchableOpacity>
        {isActive && <Text style={styles.description}>{data.description}</Text>}
      </View>
      <SymptomCTA
        handleToggleSymptom={handleToggleSymptom}
        selectedSymptoms={selectedSymptoms}
        currentSymptom={data.name}
      />
    </View>
  );
};

export default SearchResult;
