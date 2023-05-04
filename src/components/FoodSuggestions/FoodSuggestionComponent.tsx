import React, { useContext, useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome';

/** Helpers */
import { ScreenWrapper } from '../utility/ScreenWrapper';
import { screenTitles } from '../../lib/helpers/navigation';
import { colors, hexToRgba } from '../../lib/styles';
import { fetchFoodSuggestions, fetchNutrients } from '../../lib/datasource';
import { SearchContext } from '../../screens/SymptomSearchScreen';
import { logError } from '../../lib/helpers/platform';
import { Food } from '../../lib/types/database';
import { mutateNutrientsArray } from '../../lib/helpers/api';

interface FoodSuggestionComponentProps {
  route?: RouteProp<{ params: { symptoms: string[] } }>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  symptomPillContainer: {
    flexDirection: 'row'
  },
  symptomPill: {
    backgroundColor: hexToRgba(colors.main.primary, '0.1'),
    height: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    flexDirection: 'row',
    paddingHorizontal: 16
  },
  symptomPillText: {
    color: colors.main.primaryLight,
    paddingRight: 8,
    fontSize: 14
  },
  symptomPillIcon: {
    paddingHorizontal: 4
  }
});

export const FoodSuggestionComponent: React.FC<
  FoodSuggestionComponentProps
> = ({ route }) => {
  const { selectedSymptoms, setSelectedSymptoms } = useContext(SearchContext);
  const [suggestions, setSuggestions] = useState<Food[]>([]);
  const navigation = useNavigation();

  const handleRemoveSymptom = (symptomName: string) => () => {
    selectedSymptoms?.delete(symptomName);
    const updated = selectedSymptoms;
    setSelectedSymptoms?.(new Set(updated));
    if (selectedSymptoms?.size === 0) {
      navigation.goBack();
    }
  };

  const getFoodSuggestions = async (selectedSymptoms: Set<string>): Promise<Food[]> => {
    try {
      const symptoms = Array.from(selectedSymptoms);
      const nutrients = await fetchNutrients(symptoms);
      const nutrientNames: string[] = [];
      
      nutrients.forEach((nutrientsArr) => {
        return nutrientsArr.forEach((nutrient) => nutrientNames.push(nutrient.name));
      });
      const suggestions = await fetchFoodSuggestions({ nutrients: nutrientNames });
      return suggestions || [];
    } catch(err) {
      logError(err);
      return [];
    }
  };


  useEffect(() => {
    if (!!selectedSymptoms?.size) {
      getFoodSuggestions(selectedSymptoms).then((suggestions) => {
        setSuggestions(suggestions);
      }).catch(logError);
    }
  }, [selectedSymptoms]);

  const renderSymptomPill = (symptom: string) => {
    return (
      <TouchableOpacity
        style={styles.symptomPill}
        key={symptom}
        onPress={handleRemoveSymptom(symptom)}
      >
        <Text style={styles.symptomPillText}>{symptom}</Text>
        <Icon
          icon="times-circle"
          color={colors.main.primaryLight}
          style={styles.symptomPillIcon}
          size={20}
        />
      </TouchableOpacity>
    );
  };

  return (
    <ScreenWrapper
      title={screenTitles.symptomSearch.FOOD_SUGGESTIONS}
      mode="middle"
      expandedContentArea
    >
      <View style={styles.container}>
        <FlatList
          data={selectedSymptoms ? Array.from(selectedSymptoms) : []}
          renderItem={(data) => renderSymptomPill(data.item)}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.symptomPillContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScreenWrapper>
  );
};
