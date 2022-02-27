import React, { useEffect } from 'react';
import store from './redux';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabs from './components/BottomTabs';
import { initiateIconLibrary } from './lib/icons';

/** Components */
import Home from './components/Home';

const Tab = createBottomTabNavigator();

const App = () => {
  useEffect(() => {
    initiateIconLibrary();
  },[])
  
  return (
    <NavigationContainer>
      <Provider store={store}>
        <BottomTabs/>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
