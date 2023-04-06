import { Dispatch } from 'redux';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore, {
  FirebaseFirestoreTypes
} from '@react-native-firebase/firestore';
import EncryptedStorage from 'react-native-encrypted-storage';

/** Helpers */
import { accountActions } from './types';
import { asyncAction, genericAction } from '../helpers';
import { FirestoreUser, handleCheckUsername } from '../../lib/helpers/auth';
import { ENCRYPTED_STORAGE_KEYS } from '../../lib/encryptedStorage';
import { logError } from '../../lib/helpers/platform';

export const signin = (dispatch: Dispatch, email: string, password: string) => {
  const signinPromise = auth().signInWithEmailAndPassword(email, password);
  asyncAction(signinPromise, accountActions.signin, dispatch);
  return signinPromise;
};

export const createUserWithEmailAndPassword = async (
  dispatch: Dispatch,
  email: string,
  password: string,
  username: string
): Promise<FirebaseAuthTypes.User> => {
  username = username.toLowerCase();
  email = email.toLowerCase();

  const accountCreatePromise = handleCheckUsername(username).then(
    (userExists) => {
      if (!userExists) {
        return auth()
          .createUserWithEmailAndPassword(email, password)
          .then((res) => res.user);
      }
      throw new Error('User not found');
    }
  );

  asyncAction(accountCreatePromise, accountActions.createAccount, dispatch);
  return accountCreatePromise;
};

export const logout = async (dispatch: Dispatch) => {
  const logoutPromise = auth()
    .signOut()
    .then(() => {
      EncryptedStorage.removeItem(ENCRYPTED_STORAGE_KEYS.CURA_USER_TOKEN);
    })
    .catch((err) => {
      logError(err);
    });
  asyncAction(logoutPromise, accountActions.logout, dispatch);
  return logoutPromise;
};

export const setUser = (
  dispatch: Dispatch,
  user: FirestoreUser | FirebaseFirestoreTypes.DocumentData | undefined
) => {
  genericAction(accountActions.setUser, user, dispatch);
};

export const updateUserInfo = async (
  dispatch: Dispatch,
  uid: string,
  userData: Partial<FirestoreUser>
): Promise<FirebaseFirestoreTypes.DocumentData | undefined> => {
  // Reference to the Firestore collection
  const collectionRef = firestore().collection('users').doc(uid);
  const setOptions: FirebaseFirestoreTypes.SetOptions = {
    mergeFields: Object.keys(userData)
  };

  // Update the document
  await collectionRef.set(
    {
      ...userData,
      uid
    },
    setOptions
  );

  // Fetch the updated user
  const updateUserPromise = collectionRef
    .get({ source: 'server' })
    .then((snapshot) => {
      console.log('updated user', snapshot, snapshot.data());
      return snapshot.data();
    });

  asyncAction(updateUserPromise, accountActions.updateUser, dispatch);
  return updateUserPromise;
};
