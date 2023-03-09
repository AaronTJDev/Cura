import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/** Components */
import AccountComponent from '../components/Account/AccountComponent';
import SignupComponent from '../components/Account/SignupComponent';
import LoginComponent from '../components/Account/LoginComponent';

/** Helpers */
import { useAuth } from '../lib/helpers/auth';
import { navigate, routeNames } from '../lib/helpers/navigation';
import { OnboardingModal } from '../components/Account/Onboarding/OnboardingModal';
import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorageKeys } from '../lib/asyncStorage';
import { logError } from '../lib/helpers/platform';
import { useNavigation } from '@react-navigation/native';

const AccountStack = createNativeStackNavigator();

export default function AccountScreen() {
  const { isLoggedIn } = useAuth();
  const navigation = useNavigation();

  const handleAccountScreenRoutingOnLaunch = async () => {
    const completedFTUE = await AsyncStorage.getItem(
      AsyncStorageKeys.COMPLETED_FTUE
    );

    await AsyncStorage.clear();

    if (!completedFTUE) {
      navigate(routeNames.account.ONBOARDING_MODAL);
    } else if (!!completedFTUE && !isLoggedIn) {
      navigate(routeNames.account.SIGNUP);
    } else {
      navigate(routeNames.account.LOGIN);
    }
  };

  useEffect(() => {
    handleAccountScreenRoutingOnLaunch().catch(logError);
  }, [isLoggedIn, navigation]);

  return (
    <AccountStack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerBackground: () => null
      }}
    >
      <AccountStack.Group>
        <AccountStack.Screen
          name={routeNames.account.ACCOUNT}
          component={AccountComponent}
        />
      </AccountStack.Group>
      <AccountStack.Group>
        <AccountStack.Screen
          name={routeNames.account.SIGNUP}
          component={SignupComponent}
        />
        <AccountStack.Screen
          name={routeNames.account.LOGIN}
          component={LoginComponent}
        />
      </AccountStack.Group>
      <AccountStack.Group
        screenOptions={{
          presentation: 'modal',
          headerShown: false
        }}
      >
        <AccountStack.Screen
          name={routeNames.account.ONBOARDING_MODAL}
          component={OnboardingModal}
        />
      </AccountStack.Group>
    </AccountStack.Navigator>
  );
}
