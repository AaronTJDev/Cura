import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome';

// *** Helpers *** //
import { colors } from '../../lib/styles';

const styles = StyleSheet.create({
  searchResultButtonContainer: {
    width: 24,
    height: 24,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    right: 16,
    top: 12
  }
});

interface SymptomCTAProps {
  currentSymptom: string;
  selectedSymptoms?: Set<string>;
  handleToggleSymptom: () => void;
}

const SymptomCTA: React.FC<SymptomCTAProps> = ({
  handleToggleSymptom,
  selectedSymptoms,
  currentSymptom
}) => {
  return !selectedSymptoms?.has(currentSymptom) ? (
    <TouchableOpacity
      style={[
        styles.searchResultButtonContainer,
        { backgroundColor: colors.main.blue75 }
      ]}
      onPress={handleToggleSymptom}
    >
      <Icon icon="plus" color={colors.main.blue} />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={[
        styles.searchResultButtonContainer,
        { backgroundColor: colors.main.red }
      ]}
      onPress={handleToggleSymptom}
    >
      <Icon icon="minus" color={colors.main.white} />
    </TouchableOpacity>
  );
};

export default SymptomCTA;
