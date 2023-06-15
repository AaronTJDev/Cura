import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { colors } from '../../lib/styles';

interface CheckboxProps {
  onChange: (isChecked: boolean) => void;
  isChecked: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ onChange, isChecked }) => {
  const handleCheckboxToggle = () => {
    onChange(!isChecked);
  };

  return (
    <TouchableOpacity onPress={handleCheckboxToggle}>
      <View style={[styles.checkbox, isChecked && styles.checkboxSelected]}>
        {isChecked && <View style={styles.checkboxInner} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: colors.main.primaryDark,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkboxSelected: {
    backgroundColor: 'white'
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: colors.main.primaryLight,
    borderRadius: 2
  }
});

export default Checkbox;
