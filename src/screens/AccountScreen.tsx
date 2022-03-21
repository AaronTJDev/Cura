import React from 'react'
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

/** Components */
import AccountComponent from '../components/Account/AccountComponent';
import SignupComponent from '../components/Account/SignupComponent';

/** Helpers */
import { fonts } from '../lib/styles';

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
          component={AccountComponent}
        />
        <AccountStack.Screen
          name="Signup"
          component={SignupComponent}
          options={{
            headerShown: true,
            headerTitleStyle: {
              fontFamily: fonts.NunitoSansSemiBold
            }
          }}
        />
      </AccountStack.Navigator>
  )
}
