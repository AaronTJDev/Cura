import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

/** Components */
import AccountComponent from '../components/Account/AccountComponent';
import SignupComponent from '../components/Account/SignupComponent';
import LoginComponent from '../components/Account/LoginComponent';

/** Helpers */
import { useAuth } from '../lib/helpers/auth';
import { routeNames } from '../lib/helpers/navigation';

// const UserAccount = () => {
//   const dispatch = useDispatch();
//   const isLoading = useSelector(getIsAccountLoading);
//
//   const handleLogout = () => {
//     logout(dispatch);
//   };
//
//   const LogoutButton = () => (
//     <TouchableOpacity onPress={handleLogout}>
//       <Text>Logout</Text>
//     </TouchableOpacity>
//   );
//
//   return (
//     <ScreenWrapper title={'My title'}>
//       <View
//         style={{
//           width: '100%',
//           height: '100%',
//           justifyContent: 'center',
//           alignItems: 'center'
//         }}
//       >
//         {isLoading ? <ActivityIndicator /> : <LogoutButton />}
//       </View>
//     </ScreenWrapper>
//   );
// };

interface AccountScreenProps {
  navigation: BottomTabNavigationProp<any>;
}

const AccountStack = createNativeStackNavigator();

export default function AccountScreen({ navigation }: AccountScreenProps) {
  const { isLoggedIn } = useAuth();
  const [initialRoute, setIntialRoute] = useState<string>(
    routeNames.account.ACCOUNT
  );

  useEffect(() => {
    console.log('isLoggedIn:', isLoggedIn);
    if (isLoggedIn) {
      setIntialRoute(routeNames.account.ACCOUNT);
    } else {
      setIntialRoute(routeNames.account.SIGNUP);
    }
  }, [isLoggedIn, navigation]);

  return (
    <AccountStack.Navigator
      initialRouteName={initialRoute}
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
    </AccountStack.Navigator>
  );
}
