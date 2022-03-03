import React, {useEffect} from 'react'
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native'

/** Helpers */
import { assetResolver } from '../../lib/assetResolver';

const styles = StyleSheet.create({
  container: {
    flex: .66,
    alignItems: 'center'
  },
  logo: {
    width: '66%',
    resizeMode: 'contain'
  }
});

export default function Login() {
  useEffect(() => { console.log('ASSET RESOLVER', assetResolver)}, [])
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={assetResolver.images.logo}
      />
    </View>
  )
};
