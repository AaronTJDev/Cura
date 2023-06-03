import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

//** Helpers **/
import { colors, fonts } from '../../lib/styles';
import { ISymptom } from './SearchResultList';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome';
import { SearchContext } from '../../screens/SymptomSearchScreen';

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
  isLastItem
}) => {
  const { selectedSymptoms, setSelectedSymptoms } = useContext(SearchContext);
  const [isActive, setIsActive] = useState<boolean>(false);

  // write a function to toggle items in a set using setSelectedSymptoms
  // if the item is already in the set, remove it
  // if the item is not in the set, add it
  const toggleSelectedSymptom = () => {
    if (setSelectedSymptoms) {
      if (selectedSymptoms?.has(data.name)) {
        selectedSymptoms.delete(data.name);
        const updated = new Set(selectedSymptoms);
        setSelectedSymptoms(updated);
      } else {
        setSelectedSymptoms(new Set(selectedSymptoms?.add(data.name)));
      }
    }
  };

  useEffect(() => {
    if (selectedSymptoms?.has(data.name)) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [selectedSymptoms?.size]);

  return (
    <View
      key={`sr-${index}`}
      style={[styles.searchResult, isLastItem ? { borderBottomWidth: 0 } : {}]}
    >
      <TouchableOpacity
        style={styles.searchTextRow}
        onPress={toggleSelectedSymptom}
      >
        <Text style={styles.searchResultText}>{data.name}</Text>
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
