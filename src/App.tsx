import React, { useEffect } from 'react';
import store from './redux';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

/** Helpers */
import { navigationRef } from './lib/helpers/navigation';
import { useAuth } from './lib/helpers/auth';

/** Components */
import MainNavigation from './components/MainNavigation';
import Loader from './components/Loader';

const App = () => {
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    console.log('is logged in:', isLoggedIn);
  }, [isLoggedIn])

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
