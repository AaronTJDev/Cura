import React, { useCallback, useEffect } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStripe } from '@stripe/stripe-react-native';

/** Helpers */
import { navigationRef } from './lib/helpers/navigation';
import store from './redux';

/** Components */
import MainNavigation from './components/MainNavigation';
import { GlobalLoader } from './components/utility/GlobalLoader';
import { Linking } from 'react-native';

const App = () => {
  const { handleURLCallback } = useStripe();

  const handleDeepLink = useCallback(
    async (url: string | null) => {
      if (url) {
        const stripeHandled = await handleURLCallback(url);
        if (stripeHandled) {
          console;
        } else {
        }
      }
    },
    [handleURLCallback]
  );

  useEffect(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      handleDeepLink(initialUrl);
    };

    getUrlAsync();

    const deepLinkListener = Linking.addEventListener(
      'url',
      (event: { url: string }) => {
        handleDeepLink(event.url);
      }
    );

    return () => deepLinkListener.remove();
  }, [handleDeepLink]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Provider store={store}>
        <SafeAreaView style={{ flex: 1 }}>
          <MainNavigation />
          <GlobalLoader />
        </SafeAreaView>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
