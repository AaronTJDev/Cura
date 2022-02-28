import React from 'react';
import store from './redux';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

/** components */
import BottomTabs from './components/BottomTabs';

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <BottomTabs/>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
