import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/** Components */
import AccountComponent from '../components/Account/AccountComponent';
import SignupComponent from '../components/Account/SignupComponent';
import LoginComponent from '../components/Account/LoginComponent';

/** Helpers */
import { fonts } from '../lib/styles';

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: fonts.NunitoSansSemiBold,
  },
});

const AccountStack = createNativeStackNavigator();

export default function AccountScreen() {
  return (
    <AccountStack.Navigator
      initialRouteName="Auth"
      screenOptions={{
        headerShown: false,
        headerBackTitleVisible: false,
      }}
    >
      <AccountStack.Screen name="Auth" component={AccountComponent} />
      <AccountStack.Screen
        name="Signup"
        component={SignupComponent}
        options={{
          headerShown: true,
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <AccountStack.Screen
        name="Login"
        component={LoginComponent}
        options={{
          headerShown: true,
          headerTitleStyle: styles.headerTitle,
        }}
      />
    </AccountStack.Navigator>
  );
}
