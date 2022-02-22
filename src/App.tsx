import React from 'react';
import store from './redux';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/** Components */
import Home from './components/Home';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
