import React from 'react';
import store from './redux';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

/** Helpers */
import { navigationRef } from './lib/helpers/navigation';

/** Components */
import MainNavigation from './components/MainNavigation';
import Loader from './components/utility/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Provider store={store}>
        <SafeAreaView style={{ flex: 1, backgroundColor: 'blue' }}>
          <MainNavigation />
          <Loader />
        </SafeAreaView>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
