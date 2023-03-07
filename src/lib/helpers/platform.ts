import { Platform } from 'react-native';

export const isAndroid = Platform.OS === 'android' ? true : false;
export const isIos = Platform.OS === 'ios' ? true : false;

export const logError = (error: any) => {
  console.error('An error occurred:', error);
};
