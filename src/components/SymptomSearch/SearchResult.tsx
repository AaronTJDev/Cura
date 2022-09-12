import React from 'react';
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
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 8,
    marginVertical: 10
  },
  searchResultText: {
    paddingLeft: 16,
    fontFamily: fonts.ComfortaaLight,
    alignSelf: 'center'
  },
  searchResultButtonContainer: {
    backgroundColor: colors.main.blue,
    width: 24,
    height: 24,
    borderRadius: 16,
    position: 'absolute',
    right: 16,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

interface SearchResultProp {
  data: ISearchResult;
}

const SearchResult: React.FC<SearchResultProp> = ({ data }) => {
  return (
    <View style={styles.searchResult}>
      <Text style={styles.searchResultText}>{data.name}</Text>
      <TouchableOpacity style={styles.searchResultButtonContainer}>
        <Icon icon="plus" color={colors.main.white} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchResult;
