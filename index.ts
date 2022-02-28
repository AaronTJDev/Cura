/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

/** helpers */
import { initiateIconLibrary } from './src/lib/icons';
initiateIconLibrary();

AppRegistry.registerComponent(appName, () => App);
