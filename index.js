/**
 * @format
 */
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { initStripe } from '@stripe/stripe-react-native';

/** Components */
import App from './src/App';

/** helpers */
import env from './env';
import { initiateIconLibrary } from './src/lib/icons';
import { logError } from './src/lib/helpers/platform';

const initializeAppLibs = async () => {
  initiateIconLibrary();
  try {
    await initStripe({
      publishableKey: env.stripe.publishableKey
    });
  } catch (err) {
    logError(err);
  }
};

initializeAppLibs().then(() => {
  AppRegistry.registerComponent(appName, () => App);
});
