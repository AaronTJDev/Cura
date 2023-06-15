import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome';
import { upperFirst } from 'lodash-es';
import EncryptedStorage from 'react-native-encrypted-storage';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';

/** Components */
import AccountScreen from '../../screens/AccountScreen';
import SymptomSearchScreen from '../../screens/SymptomSearchScreen';

/** Helpers */
import { colors, fonts } from '../../lib/styles';
import { isAndroid, logError } from '../../lib/helpers/platform';
import { routeNames } from '../../lib/helpers/navigation';
import { ENCRYPTED_STORAGE_KEYS } from '../../lib/encryptedStorage';
import { setUser } from '../../redux/account/actions';
import { fetchUserAccount } from '../../lib/datasource';

interface ITab {
  icon: IconProp;
  tabBarLabel: string;
  component: React.ComponentType<any>;
  hideHeader?: boolean;
  screenTitle?: string;
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.main.white
  },
  tabBarLabel: {
    fontFamily: fonts.ComfortaaRegular,
    paddingBottom: isAndroid ? 4 : 0
  }
});

// const EmptyRender = () => <></>;

export enum TAB_NAMES {
  SEARCH = 'Search',
  SCAN = 'Scan',
  EXPLORE = 'Explore',
  ACCOUNT = 'Account'
}

export default function MainNavigation() {
  const Tab = createBottomTabNavigator();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth().onUserChanged(async (userData) => {
      if (userData) {
        try {
          const user = (await fetchUserAccount(userData.uid)) || {};
          await setUser(dispatch, user);
          const token = await userData?.getIdToken(true);

          await EncryptedStorage.setItem(
            ENCRYPTED_STORAGE_KEYS.CURA_USER_TOKEN,
            JSON.stringify({
              token: token
            })
          );
        } catch (err) {
          logError(err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const tabs = [
    {
      icon: 'home',
      tabBarLabel: TAB_NAMES.SEARCH,
      component: SymptomSearchScreen
    },
    // {
    //   icon: 'search',
    //   tabBarLabel: TAB_NAMES.SCAN,
    //   component: EmptyRender
    // },
    // {
    //   icon: 'newspaper',
    //   tabBarLabel: TAB_NAMES.EXPLORE,
    //   component: EmptyRender
    // },
    {
      icon: 'user',
      tabBarLabel: TAB_NAMES.ACCOUNT,
      component: AccountScreen
    }
  ];

  return (
    <Tab.Navigator
      initialRouteName={upperFirst(routeNames.account.ACCOUNT)}
      screenOptions={{
        tabBarActiveTintColor: '#003D2F',
        tabBarInactiveTintColor: colors.main.gray,
        tabBarHideOnKeyboard: true,
        headerShown: false
      }}
    >
      {tabs.map((tab, index) => {
        const { component, icon, tabBarLabel, screenTitle } = tab as ITab;
        return (
          <Tab.Screen
            key={index}
            name={screenTitle ?? tabBarLabel}
            component={component}
            options={{
              tabBarLabel: tabBarLabel,
              tabBarLabelStyle: styles.tabBarLabel,
              tabBarStyle: styles.tabBar,
              tabBarActiveTintColor: colors.main.primaryDark,
              tabBarInactiveTintColor: colors.main.gray10,
              tabBarIcon: ({ focused }) => {
                return (
                  <Icon
                    icon={icon}
                    color={focused ? colors.main.primary : colors.main.gray10}
                    size={18}
                  />
                );
              }
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}
