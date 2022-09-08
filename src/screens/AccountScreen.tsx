import React, { useCallback, useEffect } from 'react';
import { Text } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';

/** Components */
import AccountComponent from '../components/Account/AccountComponent';
import SignupComponent from '../components/Account/SignupComponent';
import LoginComponent from '../components/Account/LoginComponent';

/** Helpers */
import { useAuth } from '../lib/helpers/auth';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';


const authNavigationHeader: NativeStackNavigationOptions = {
  headerShown: true,
  headerTransparent: true,
  title: ''
};

const UserAccount = () => {
  return (
    <></>
  )
};

interface AccountScreenProps {
  navigation: BottomTabNavigationProp<any>;
};

const AccountStack = createNativeStackNavigator();

export default function AccountScreen({ navigation }: AccountScreenProps) {
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate('Symptom Search');
    }
  }, [isLoggedIn]);

  return (
    <AccountStack.Navigator
      initialRouteName={'Auth'}
      screenOptions={{
        headerShown: false,
        headerBackTitleVisible: false
      }}
    >
      <AccountStack.Screen name="Auth" component={AccountComponent} />
      <AccountStack.Screen
        name="Signup"
        component={SignupComponent}
        options={authNavigationHeader}
      />
      <AccountStack.Screen
        name="Login"
        component={LoginComponent}
        options={authNavigationHeader}
      />
      <AccountStack.Screen
        name="User Account"
        component={UserAccount}
        options={{...authNavigationHeader, title: 'Account'}}
      />
    </AccountStack.Navigator>
  );
}
