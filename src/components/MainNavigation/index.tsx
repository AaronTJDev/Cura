import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome';

/** Components */
import AccountScreen from '../../screens/AccountScreen';
import SymptomSearch from '../../screens/SymptomSearch';

/** Helpers */
import { colors, fonts } from '../../lib/styles';
import { isAndroid } from '../../lib/helpers/platform';

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

const EmptyRender = () => <></>;

export default function MainNavigation() {
  const Tab = createBottomTabNavigator();

  const tabs = [
    {
      icon: 'home',
      tabBarLabel: 'Home',
      component: SymptomSearch
    },
    {
      icon: 'search',
      tabBarLabel: 'Scan',
      component: EmptyRender
    },
    {
      icon: 'newspaper',
      tabBarLabel: 'Explore',
      component: EmptyRender
    },
    {
      icon: 'user',
      tabBarLabel: 'Account',
      component: AccountScreen
    }
  ];

  return (
    <Tab.Navigator
      initialRouteName={'Home'}
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
