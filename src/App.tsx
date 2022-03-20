import React, {  } from 'react';
import store from './redux';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

/** Components */
import MainNavigation from './components/MainNavigation';
import Loader from './components/Loader';

const App = () => {

  return (
    <NavigationContainer>
      <Provider store={store}>
        <MainNavigation/>
        <Loader/>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
