import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/** Components */
import AuthComponent from '../components/Account/AuthComponent';
import SignupComponent from '../components/Account/SignupComponent';


const AccountStack = createNativeStackNavigator();

export default function AccountScreen() {
  return (
      <AccountStack.Navigator
        initialRouteName="Auth"
        screenOptions={{
          headerShown: false
        }}
      >
        <AccountStack.Screen
          name="Auth"
          component={AuthComponent}
        />
        <AccountStack.Screen
          name="Signup"
          component={SignupComponent}
        />
      </AccountStack.Navigator>
  )
}
