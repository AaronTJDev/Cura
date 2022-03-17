import React from 'react'
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

/** Components */
import AuthComponent from '../components/Account/AuthComponent';
import SignupComponent from '../components/Account/SignupComponent';


const AccountStack = createNativeStackNavigator();

export default function AccountScreen(props: NativeStackNavigationProp<any>) {
  return (
      <AccountStack.Navigator
        initialRouteName="Auth"
        screenOptions={{
          headerShown: false,
          headerBackTitleVisible: false
        }}
      >
        <AccountStack.Screen
          name="Auth"
          component={AuthComponent}
        />
        <AccountStack.Screen
          name="Signup"
          component={SignupComponent}
          options={{
            headerShown: true,
            
          }}
        />
      </AccountStack.Navigator>
  )
}
