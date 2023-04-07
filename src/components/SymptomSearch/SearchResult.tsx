import React, { useMemo } from 'react';

//** Helpers **/

import { ISymptom } from './SearchResultList';
import { navigate } from '../../lib/helpers/navigation';

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

  console.log(isActive, handleGoToSymptomInfo);

  return <></>;
};

export default SearchResult;
