import EncryptedStorage from 'react-native-encrypted-storage';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

/** Helpers */
import { ENCRYPTED_STORAGE_KEYS } from '../encryptedStorage';
import { logError } from './platform';
import { firebase } from '@react-native-firebase/functions';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

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
  user: FirebaseAuthTypes.User | FirebaseFirestoreTypes.DocumentData
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

export const handleCheckUsername = async (
  username: string
): Promise<Boolean> => {
  const checkUsername = firebase
    .functions(firebase.app())
    .httpsCallable('checkUsername');
  try {
    const result = await checkUsername({ username });
    return result.data.isUsernameTaken;
  } catch (err) {
    logError(err);
    return false;
  }
};
