/**
 * @format
 */

import {AppRegistry} from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import App from './src/App';
import {name as appName} from './app.json';

/** helpers */
import env from './env';
import { initiateIconLibrary } from './src/lib/icons';

const initializeAppLibs = () => {
  firebase.initializeApp(env.firebaseConfig);
  initiateIconLibrary();
}

initializeAppLibs();
AppRegistry.registerComponent(appName, () => App);
