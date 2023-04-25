import React, { useEffect, useState } from 'react';
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
import { fetchNutrients } from '../../lib/datasource';

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
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const navigation = useNavigation();

  const handleRemoveSymptom = (symptomName: string) => () => {
    setSymptoms(symptoms.filter((symptom) => symptom !== symptomName));
    if (symptoms.length === 1) {
      navigation.goBack();
    }
  };

  useEffect(() => {
    const params = route?.params;
    const selectedSymptoms = params?.symptoms || [];
    fetchNutrients(selectedSymptoms);
  }, []);

  useEffect(() => {
    const params = route?.params;
    const selectedSymptoms = params?.symptoms || [];
    setSymptoms(selectedSymptoms);
  }, [route?.params?.symptoms]);

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
          data={symptoms}
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
