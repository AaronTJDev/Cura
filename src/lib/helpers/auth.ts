import { useEffect, useState } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import auth from '@react-native-firebase/auth';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = auth().onIdTokenChanged(async (user) => {
      console.log('navigating', user);
      if (user) {
        try {
          const token = await user?.getIdToken(true);
          EncryptedStorage.setItem(
            'user_session',
            JSON.stringify({
              token: token
            })
          );
          setIsLoggedIn(true);
        } catch (err) {
          console.log(err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    isLoggedIn
  };
};

export const getUserToken = async () => {
  try {
    const token = await EncryptedStorage.getItem('user_session');
    if (token) {
      return JSON.parse(token);
    } else {
      throw new Error('User token not found.');
    }
  } catch (err) {
    console.log(err);
  }
};
