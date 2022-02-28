import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Account from '../Account';
import Home from '../Home';
import CookBook from '../CookBook';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-native-fontawesome';
import { fonts } from '../../lib/styles';

interface ITab {
  icon: IconProp;
  tabBarLabel: string;
  component: React.ComponentType<any>;
}

const styles = StyleSheet.create({
  fontTest: {
    fontFamily: fonts.CrimsonProBlack
  }
})

export default function BottomTabs() {
  const Tab = createBottomTabNavigator();
  const tabs = [
    {
      icon: 'home',
      tabBarLabel: 'Home',
      component: Home
    },
    {
      icon: 'book',
      tabBarLabel: 'Cook Book',
      component: CookBook
    },
    {
      icon: 'user',
      tabBarLabel: 'Account',
      component: Account
    }
  ]

  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarActiveTintColor: '#564439',
        tabBarInactiveTintColor: '#DAC6BE',
        
      }}
    >
      {
        tabs.map((tab, index) => {
          const { component, icon, tabBarLabel } = tab as ITab;
          return (
            <Tab.Screen
              key={index}
              name={tabBarLabel}
              component={component}
              options={{
                tabBarLabel,
                tabBarLabelStyle: styles.fontTest,
                tabBarIcon: ({ color }) => {
                  return (
                  <Icon icon={icon} color={color} size={18}/>
                )}
              }}
            />
          )
        })
      }
    </Tab.Navigator>
  )
}
