import React, { useEffect } from 'react';
import store from './redux';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

/** Helpers */
import { navigationRef } from './lib/helpers';
import { AsyncStorageKeys, getItem, setItem } from './lib/asyncStorage';
import { fetchRecipes } from './lib/datasource';

/** Components */
import MainNavigation from './components/MainNavigation';
import Loader from './components/Loader';


auth().onIdTokenChanged(async user => {
  if (user) {
    try {
      const token = await user?.getIdToken(true);
      if (token) {
        await setItem(AsyncStorageKeys.TOKEN, token);
      }
    } catch (err) {
      console.log(err);
    }
  }
});

const App = () => {
  useEffect(() => {
    fetchRecipes();
  });

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
