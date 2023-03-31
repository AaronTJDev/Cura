import React from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity } from 'react-native';
import { colors, fonts } from '../lib/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '80%'
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: fonts.CrimsonProBlack
  },
  message: {
    fontSize: 12,
    fontFamily: fonts.ComfortaaLight,
    marginBottom: 20,
    textAlign: 'center'
  },
  ctaText: {
    fontFamily: fonts.ComfortaaSemiBold,
    color: colors.main.primaryLight
  }
});

interface CustomModalProps {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  title,
  message
}) => {
  return (
    <Modal animationType="fade" visible={visible} onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.ctaText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
