/**
 * @format
 */
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

/** Components */
import App from './src/App';

/** helpers */
import {initiateIconLibrary} from './src/lib/icons';
const initializeAppLibs = async () => {
  initiateIconLibrary();
};

initializeAppLibs();
AppRegistry.registerComponent(appName, () => App);
