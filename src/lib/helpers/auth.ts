import { useEffect } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { ENCRYPTED_STORAGE_KEYS } from '../encryptedStorage';
import { setUser } from '../../redux/account/actions';
import { useDispatch } from 'react-redux';

export type NormalizedUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  metaData: {
    lastSignInTime?: string;
    creationTime?: string;
  };
  verified: boolean;
};

const normalizeUser = (user: FirebaseAuthTypes.User): NormalizedUser => {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    metaData: user.metadata,
    verified: user.emailVerified
  };
};

export const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth().onUserChanged(async (userData) => {
      if (userData) {
        try {
          setUser(dispatch, normalizeUser(userData));
          const token = await userData?.getIdToken(true);

          EncryptedStorage.setItem(
            ENCRYPTED_STORAGE_KEYS.CURA_USER_TOKEN,
            JSON.stringify({
              token: token
            })
          );
        } catch (err) {
          console.log(err);
        }
      }
    });

    return () => unsubscribe();
  }, []);
};

export const getUserToken = async () => {
  try {
    const token = await EncryptedStorage.getItem(
      ENCRYPTED_STORAGE_KEYS.CURA_USER_TOKEN
    );
    if (token) {
      return JSON.parse(token);
    } else {
      throw new Error('User token not found.');
    }
  } catch (err) {
    console.log(err);
  }
};
