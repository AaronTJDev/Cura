import { useEffect } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';

/** Helpers */
import { ENCRYPTED_STORAGE_KEYS } from '../encryptedStorage';
import { setUser } from '../../redux/account/actions';
import { fetchUserAccount } from '../datasource';
import { logError } from './platform';

export interface NormalizedAuthUser {
  uid: string;
  email: string | null;
  metadata: {
    lastSignInTime?: string;
    creationTime?: string;
  };
  verified: boolean;
  dateOfBirth?: string;
}

export interface FirestoreUser extends NormalizedAuthUser {
  dateOfBirth: string;
  username: string;
}

export const normalizeAuthUser = (
  user: FirebaseAuthTypes.User
): NormalizedAuthUser => {
  return {
    uid: user.uid,
    email: user.email,
    metadata: user.metadata,
    verified: user.emailVerified
  };
};

export const authErrorsFromServer = {
  emailInUse: 'auth/email-already-in-use',
  invalidEmail: 'auth/invalid-email',
  weakPassword: 'auth/weak-password',
  usernameInUse: 'User with username:'
};

export const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth().onUserChanged(async (userData) => {
      if (userData) {
        try {
          const user = await fetchUserAccount(userData.uid);
          setUser(dispatch, user);
          const token = await userData?.getIdToken(true);

          EncryptedStorage.setItem(
            ENCRYPTED_STORAGE_KEYS.CURA_USER_TOKEN,
            JSON.stringify({
              token: token
            })
          );
        } catch (err) {
          logError(err);
        }
      }
    });

    return () => unsubscribe();
  }, [dispatch]);
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
    logError(err);
  }
};
