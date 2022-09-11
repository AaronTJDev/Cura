import React from 'react';
import store from './redux';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

/** Helpers */
import { navigationRef } from './lib/helpers/navigation';

/** Components */
import MainNavigation from './components/MainNavigation';
import Loader from './components/utility/Loader';

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Provider store={store}>
        <MainNavigation />
        <Loader />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
