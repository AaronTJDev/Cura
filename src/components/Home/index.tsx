import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { login } from '../../redux/account/actions';

const Home = () => {
  const dipatch = useDispatch();
  
  const handleLogin = () => {
    login(dipatch).catch(console.error);
  };

  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity onPress={handleLogin}>
        <Text>Go to Details</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Home;