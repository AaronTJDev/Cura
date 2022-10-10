import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome';

// *** Helpers *** //
import { colors } from '../../lib/styles';
import { SymptomInfoProps } from '../../screens/SymptomInfo';

const CustomHeader = ({ navigation }: SymptomInfoProps) => {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon icon="arrow-left" color={colors.main.black} />
    </TouchableOpacity>
  );
};

export default CustomHeader;
