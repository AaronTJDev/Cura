import React, { useContext } from 'react';

/** Components */
import { Search } from './Search';
import { SearchContext } from '../../screens/SymptomSearchScreen';
import SearchResultList from './SearchResultList';

/** Helpers */
import { ScreenWrapper } from '../utility/ScreenWrapper';
import { screenTitles } from '../../lib/helpers/navigation';

export const SymptomSearchComponent = () => {
  const { suggestions } = useContext(SearchContext);
  return (
    <ScreenWrapper
      title={screenTitles.symptomSearch.SEARCH}
      expandedContentArea
      hideBackButton
      mode={'search'}
    >
      <Search />
      <SearchResultList suggestions={suggestions} />
    </ScreenWrapper>
  );
};

export default SymptomSearchComponent;
