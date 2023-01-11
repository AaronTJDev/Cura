import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions
} from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

/** Components */
import AccountComponent from '../components/Account/AccountComponent';
import SignupComponent from '../components/Account/SignupComponent';
import LoginComponent from '../components/Account/LoginComponent';

/** Helpers */
import { useAuth } from '../lib/helpers/auth';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/account/actions';
import { getIsAccountLoading } from '../redux/account/selectors';
import { routeNames } from '../lib/helpers/navigation';

const authNavigationHeader: NativeStackNavigationOptions = {
  headerShown: true,
  headerTransparent: true,
  title: ''
};

const UserAccount = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsAccountLoading);

  const handleLogout = () => {
    logout(dispatch);
  };

  const LogoutButton = () => (
    <TouchableOpacity onPress={handleLogout}>
      <Text>Logout</Text>
    </TouchableOpacity>
  );

  return (
    <>
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {isLoading ? <ActivityIndicator /> : <LogoutButton />}
      </View>
    </>
  );
};

interface AccountScreenProps {
  navigation: BottomTabNavigationProp<any>;
}

const AccountStack = createNativeStackNavigator();

export default function AccountScreen({ navigation }: AccountScreenProps) {
  const { isLoggedIn } = useAuth();
  const [initialRoute, setIntialRoute] = useState<string>(
    routeNames.account.AUTH
  );

  useEffect(() => {
    if (isLoggedIn) {
      setIntialRoute(routeNames.account.MANAGE_ACCOUNT);
    } else {
      setIntialRoute(routeNames.account.AUTH);
    }
  }, [isLoggedIn, navigation]);

  return (
    <AccountStack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
        headerBackTitleVisible: false
      }}
    >
      <AccountStack.Group>
        <AccountStack.Screen
          name={routeNames.account.MANAGE_ACCOUNT}
          component={UserAccount}
          options={{ ...authNavigationHeader, title: 'Account' }}
        />
        <AccountStack.Screen
          name={routeNames.account.AUTH}
          component={AccountComponent}
        />
      </AccountStack.Group>
      <AccountStack.Group screenOptions={{ presentation: 'modal' }}>
        <AccountStack.Screen
          name={routeNames.account.SIGNUP}
          component={SignupComponent}
          options={authNavigationHeader}
        />
        <AccountStack.Screen
          name={routeNames.account.LOGIN}
          component={LoginComponent}
          options={authNavigationHeader}
        />
      </AccountStack.Group>
    </AccountStack.Navigator>
  );
}
