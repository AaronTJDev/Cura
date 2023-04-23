// food suggestion component is a component that is used to display the food suggestions
// based on the user's symptoms
import React from 'react';
import { View } from 'react-native';
import { ScreenWrapper } from '../utility/ScreenWrapper';
import { screenTitles } from '../../lib/helpers/navigation';

interface FoodSuggestionComponentProps {}

export const FoodSuggestionComponent: React.FC<
  FoodSuggestionComponentProps
> = () => {
  return (
    <ScreenWrapper title={screenTitles.symptomSearch.FOOD_SUGGESTIONS}>
      <View />
    </ScreenWrapper>
  );
};
