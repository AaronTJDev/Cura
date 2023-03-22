import React, { useCallback, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/** Components */
import { AccountComponent } from '../components/Account/AccountComponent';
import SignupComponent from '../components/Account/SignupComponent';
import SigninComponent from '../components/Account/SigninComponent';

/** Helpers */
import { navigate, routeNames } from '../lib/helpers/navigation';
import { OnboardingModal } from '../components/Account/Onboarding/OnboardingModal';
import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorageKeys } from '../lib/asyncStorage';
import { logError } from '../lib/helpers/platform';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '../redux/account/selectors';
import { DobForm } from '../components/Account/Forms/DobForm';

const AccountStack = createNativeStackNavigator();

export default function AccountScreen() {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const navigation = useNavigation();

  const handleAccountScreenRoutingOnLaunch = useCallback(async () => {
    let completedFTUE = await AsyncStorage.getItem(
      AsyncStorageKeys.COMPLETED_FTUE
    );

    if (!completedFTUE) {
      navigate(routeNames.account.ONBOARDING_MODAL);
    } else if (!completedFTUE && !isLoggedIn) {
      navigate(routeNames.account.SIGNUP);
    } else if (!!completedFTUE && !isLoggedIn) {
      navigate(routeNames.account.SIGNIN);
    } else {
      navigate(routeNames.account.ACCOUNT);
    }
  }, []);

  useEffect(() => {
    handleAccountScreenRoutingOnLaunch().catch(logError);
  }, [isLoggedIn, navigation, handleAccountScreenRoutingOnLaunch]);

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
          name={routeNames.account.SIGNIN}
          component={SigninComponent}
        />
        <AccountStack.Screen
          name={routeNames.account.DOB}
          component={DobForm}
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
