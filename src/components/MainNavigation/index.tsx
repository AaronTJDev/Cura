import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome';

/** Components */
import AccountScreen from '../../screens/AccountScreen';
import Home from '../Home';
import CookBook from '../CookBook';

/** Helpers */
import { fonts } from '../../lib/styles';

interface ITab {
  icon: IconProp;
  tabBarLabel: string;
  component: React.ComponentType<any>;
}

const styles = StyleSheet.create({
  tabBarLabel: {
    fontFamily: fonts.CrimsonProBlack,
  },
});

export default function MainNavigation() {
  const Tab = createBottomTabNavigator();
  const tabs = [
    {
      icon: 'home',
      tabBarLabel: 'Home',
      component: Home,
    },
    {
      icon: 'book',
      tabBarLabel: 'Cook Book',
      component: CookBook,
    },
    {
      icon: 'user',
      tabBarLabel: 'Account',
      component: AccountScreen,
    },
  ];

  return (
    <Tab.Navigator
      initialRouteName="Account"
      screenOptions={{
        tabBarActiveTintColor: '#564439',
        tabBarInactiveTintColor: '#DAC6BE',
      }}>
      {tabs.map((tab, index) => {
        const { component, icon, tabBarLabel } = tab as ITab;
        return (
          <Tab.Screen
            key={index}
            name={tabBarLabel}
            component={component}
            options={{
              tabBarLabel,
              tabBarLabelStyle: styles.tabBarLabel,
              tabBarIcon: ({ color }) => {
                return <Icon icon={icon} color={color} size={18} />;
              },
              headerShown:
                tabBarLabel.toLowerCase() === 'account' ? false : true,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}
