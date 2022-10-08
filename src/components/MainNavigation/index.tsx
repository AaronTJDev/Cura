import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome';

/** Components */
import AccountScreen from '../../screens/AccountScreen';
import SymptomSearch from '../../screens/SymptomSearch';
import CookBook from '../CookBook';

/** Helpers */
import { colors, fonts, navigationHeader } from '../../lib/styles';

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
    fontFamily: fonts.CrimsonProExtraLight,
    color: colors.main.primary
  }
});

export default function MainNavigation() {
  const Tab = createBottomTabNavigator();
  const tabs = [
    {
      icon: 'home',
      tabBarLabel: 'Home',
      component: SymptomSearch,
      screenTitle: 'Symptom Search',
      hideHeader: true
    },
    {
      icon: 'barcode',
      tabBarLabel: 'Scanner',
      component: CookBook
    },
    {
      icon: 'user',
      tabBarLabel: 'Account',
      component: AccountScreen,
      hideHeader: true
    }
  ];

  return (
    <Tab.Navigator
      initialRouteName={'Account'}
      screenOptions={{
        tabBarActiveTintColor: '#564439',
        tabBarInactiveTintColor: '#DAC6BE',
        tabBarHideOnKeyboard: true,
        ...navigationHeader
      }}
    >
      {tabs.map((tab, index) => {
        const { component, icon, tabBarLabel, hideHeader, screenTitle } =
          tab as ITab;
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
              tabBarInactiveTintColor: colors.main.primaryLight,
              tabBarIcon: ({ color }) => {
                return <Icon icon={icon} color={color} size={18} />;
              },
              headerShown: !hideHeader,
              headerTransparent: false
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}
