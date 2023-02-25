import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

//** Helpers **/
import { colors, fonts } from '../../lib/styles';
import { ISymptom } from './SearchResultList';
import { navigate } from '../../lib/helpers/navigation';

const styles = StyleSheet.create({});

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

  return <></>;
};

export default SearchResult;
