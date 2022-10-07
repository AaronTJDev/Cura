import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

//** Helpers **/
import { colors, fonts } from '../../lib/styles';
import { ISymptom } from './SearchResultList';
import { navigate } from '../../lib/helpers/navigation';

const styles = StyleSheet.create({
  searchResult: {
    width: '100%',
    height: 60,
    shadowOffset: { height: 0, width: 0 },
    shadowColor: colors.main.gray25,
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 10,
    backgroundColor: colors.main.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 4
  },
  textGroup: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 32
  },
  description: {
    flex: 2,
    flexWrap: 'wrap'
  },
  searchTextButton: {
    flex: 1,
    justifyContent: 'center'
  },
  searchResultText: {
    fontFamily: fonts.ComfortaaLight,
    color: colors.main.blue
  }
});

interface SearchResultProps {
  data: ISymptom;
  index: number;
  activeIndex?: number;
  setActiveIndex?: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const SearchResult: React.FC<SearchResultProps> = ({
  data,
  index,
  activeIndex
}) => {
  const isActive = useMemo(() => activeIndex === index, [activeIndex]);

  const handleGoToSymptomInfo = () => {
    navigate('SymptomInfo', { symptom: data });
  };

  return (
    <View style={[styles.searchResult, isActive && { height: 108 }]}>
      <View style={styles.textGroup}>
        <TouchableOpacity
          style={styles.searchTextButton}
          onPress={handleGoToSymptomInfo}
        >
          <Text style={styles.searchResultText}>{data.name}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchResult;
