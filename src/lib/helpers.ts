import { Platform } from "react-native";

export const logError = (error: any) => {
  console.error(error);
}

export const isIos = () => {
  return Platform.OS === 'ios';
}

export const isAndroid = () => {
  return Platform.OS === 'android';
}