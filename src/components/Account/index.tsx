import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  StyleSheet,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

/** Helpers */
import { login } from '../../redux/account/actions';
import { colors } from '../../lib/styles';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  gradient: {
    flex: 1
  }
});

export default function Account() {
  const dipatch = useDispatch();
  
  const handleLogin = () => {
    login(dipatch).catch(console.error);
  };


  return (
    <View style={styles.container}>
      {/*
      // @ts-ignore */}
      <LinearGradient
        style={styles.gradient}
        colors={[colors.main.white,colors.main.white,colors.main.primaryLight]}
        start={{x: 0, y:0}}
        end={{x:0, y:1.25}}
      >

      </LinearGradient>
    </View>
  );
}
