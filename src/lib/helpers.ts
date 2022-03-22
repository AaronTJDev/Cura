import { Platform } from 'react-native';
import { createNavigationContainerRef } from '@react-navigation/native';

export const logError = (error: any) => {
  console.error(error);
};

export const isIos = () => {
  return Platform.OS === 'ios';
};

export const isAndroid = () => {
  return Platform.OS === 'android';
};

// navigation helpers
export const navigationRef = createNavigationContainerRef();

export function navigate(name: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name);
  }
}
