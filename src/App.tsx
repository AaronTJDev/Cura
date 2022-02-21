import React from 'react';
import { Provider } from 'react-redux';
import store from './redux';
import Home from './components/Home';

import { SafeAreaView } from 'react-native';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <Home />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
