import React, { useContext } from 'react';

/** Helpers */
import { ScreenWrapper } from '../utility/ScreenWrapper';
import { screenTitles } from '../../lib/helpers/navigation';

import { SearchBar } from './SearchBar';
import { SearchResultList } from './SearchResultList';
import { SearchContext } from '../../screens/SymptomSearchScreen';

export const SymptomSearchComponent = () => {
  const { suggestions } = useContext(SearchContext);
  return (
    <ScreenWrapper
      title={screenTitles.symptomSearch.SEARCH}
      expandedContentArea
      hideBackButton
      mode={'search'}
      scrollEnabled={false}
    >
      <SearchBar />
      <SearchResultList suggestions={suggestions} />
    </ScreenWrapper>
  );
};
