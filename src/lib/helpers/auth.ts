import React, { useEffect, useState } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import auth from '@react-native-firebase/auth';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = auth().onIdTokenChanged(async user => {
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
  }, [])

  return {
    isLoggedIn
  };
};
