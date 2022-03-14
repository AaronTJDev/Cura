import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/** Components */
import Login from '../components/Account/Login';


const AccountStack = createNativeStackNavigator();

export default function AccountScreen() {
  return (
      <AccountStack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false
        }}
      >
        <AccountStack.Screen
          name="Login"
          component={Login}
        />
      </AccountStack.Navigator>
  )
}
