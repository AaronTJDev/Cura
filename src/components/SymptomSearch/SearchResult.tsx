import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

//** Helpers **/
import { colors, fonts } from '../../lib/styles';
import { ISymptom } from './SearchResultList';
import { upperFirst } from 'lodash-es';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome';

const styles = StyleSheet.create({
  searchResult: {
    height: 56,
    borderBottomColor: colors.main.gray10,
    borderBottomWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 16
  },
  textGroup: {},
  description: {},
  searchTextRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  searchResultText: {
    fontFamily: fonts.ComfortaaRegular
  }
});

interface SearchResultProps {
  data: ISymptom;
  index: number;
  activeIndex?: number;
  setActiveIndex?: React.Dispatch<React.SetStateAction<number | undefined>>;
  isLastItem: boolean;
}

export const SearchResult: React.FC<SearchResultProps> = ({
  data,
  index,
  activeIndex,
  setActiveIndex,
  isLastItem
}) => {
  const isActive = useMemo(() => activeIndex === index, [activeIndex]);
  console.log('DATA', data);

  const handleGoToSymptomInfo = () => {
    setActiveIndex?.(index);
  };

  return (
    <View
      key={data.id}
      style={[styles.searchResult, isLastItem ? { borderBottomWidth: 0 } : {}]}
    >
      <TouchableOpacity
        style={styles.searchTextRow}
        onPress={handleGoToSymptomInfo}
      >
        <Text style={styles.searchResultText}>{upperFirst(data.name)}</Text>
        {isActive && (
          <Icon
            icon={'check-circle'}
            color={colors.main.primaryLight}
            size={18}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};
