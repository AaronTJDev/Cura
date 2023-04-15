import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

/** Helpers */
import { ScreenWrapper } from '../utility/ScreenWrapper';
import { screenTitles } from '../../lib/helpers/navigation';

import { SearchBar } from './SearchBar';
import { SearchResultList } from './SearchResultList';

export const SymptomSearchComponent = () => {
  return (
    <ScreenWrapper
      title={screenTitles.symptomSearch.SEARCH}
      expandedContentArea
      hideBackButton
      mode={'search'}
    >
      <SearchBar />
      <SearchResultList suggestions={[]}/>
    </ScreenWrapper>
  );
};
