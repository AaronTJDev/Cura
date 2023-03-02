import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome';

// *** Helpers *** //
import { colors } from '../../lib/styles';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    height: 200,
    width: '100%',
    top: 250
  }
});

const CustomHeader = (props: NativeStackHeaderProps) => {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon icon="arrow-left" color={colors.main.black} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;
