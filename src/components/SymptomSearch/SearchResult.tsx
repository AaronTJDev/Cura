import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome';

//** Helpers **/
import { colors, fonts } from '../../lib/styles';
import { ISearchResult } from './SearchResultList';

const styles = StyleSheet.create({
  searchResult: {
    width: '80%',
    height: 48,
    shadowOffset: { height: 0, width: 1 },
    shadowColor: colors.main.gray25,
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: colors.main.white,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    borderRadius: 8,
    marginVertical: 10
  },
  searchResultButtonContainer: {
    backgroundColor: colors.main.blue75,
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
    flexWrap: 'wrap'
  },
  searchTextButton: {
    flex: 1
  },
  searchResultText: {
    fontFamily: fonts.ComfortaaLight,
    color: colors.main.blue
  }
});

interface SearchResultProp {
  data: ISearchResult;
  index: number;
  activeIndex?: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const SearchResult: React.FC<SearchResultProp> = ({
  data,
  index,
  activeIndex,
  setActiveIndex
}) => {
  const isActive = useMemo(() => activeIndex === index, [activeIndex]);
  const toggleShowDescription = () => {
    setActiveIndex(index);
    if (isActive) {
      setActiveIndex(undefined);
    }
  };

  return (
    <View style={[styles.searchResult, isActive && { height: 128 }]}>
      <View style={styles.textGroup}>
        <TouchableOpacity
          style={styles.searchTextButton}
          onPress={toggleShowDescription}
        >
          <Text style={styles.searchResultText}>{data.name}</Text>
        </TouchableOpacity>
        {isActive && <Text style={styles.description}>{data.description}</Text>}
      </View>
      <TouchableOpacity style={styles.searchResultButtonContainer}>
        <Icon icon="plus" color={colors.main.white} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchResult;
