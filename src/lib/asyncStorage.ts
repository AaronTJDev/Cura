import AsyncStorage from '@react-native-community/async-storage';

export const AsyncStorageKeys = {
  TOKEN: 'token',
};

export const getItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (e) {
    return null;
  }
};

export const setItem = async (key: string, value: string) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    return null;
  }
};

export const deleteItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    return null;
  }
};
