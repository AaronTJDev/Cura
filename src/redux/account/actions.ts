import { Dispatch } from 'redux';
import auth from '@react-native-firebase/auth';
import firestore, {
  FirebaseFirestoreTypes
} from '@react-native-firebase/firestore';
import EncryptedStorage from 'react-native-encrypted-storage';

/** Helpers */
import { accountActions } from './types';
import { asyncAction, genericAction } from '../helpers';
import { NormalizedAuthUser, normalizeAuthUser } from '../../lib/helpers/auth';
import { ENCRYPTED_STORAGE_KEYS } from '../../lib/encryptedStorage';

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
): Promise<any> => {
  username = username.toLowerCase();
  email = email.toLowerCase();

  const accountCreatePromise = firestore()
    .collection('users')
    .where('username', '==', username)
    .get()
    .then((snapshot) => {
      console.log('found snapshot', snapshot);
      if (!snapshot.empty) {
        throw new Error(`User with username: ${username} already exists`);
      }
      return snapshot;
    })
    .then(() => {
      console.log('creating user');
      return auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          user.user.sendEmailVerification();
          return user;
        });
    })
    .then((userData) => {
      console.log('trying to create user');
      if (userData.user) {
        firestore()
          .collection('users')
          .doc(userData.user.uid)
          .set({
            ...normalizeAuthUser(userData.user),
            username
          });
      }
    });

  asyncAction(accountCreatePromise, accountActions.createAccount, dispatch);
  return accountCreatePromise;
};

export const logout = async (dispatch: Dispatch) => {
  const logoutPromise = auth()
    .signOut()
    .then((res) => {
      console.log('result from logout', res);
      EncryptedStorage.removeItem(ENCRYPTED_STORAGE_KEYS.CURA_USER_TOKEN);
    })
    .catch((err) => {
      console.log('error from logout', err);
    });
  asyncAction(logoutPromise, accountActions.logout, dispatch);
  return logoutPromise;
};

export const setUser = (dispatch: Dispatch, user: NormalizedAuthUser) => {
  genericAction(accountActions.setUser, user, dispatch);
};

export const updateUserInfo = async (
  dispatch: Dispatch,
  uid: string,
  userData: Partial<NormalizedAuthUser>
): Promise<FirebaseFirestoreTypes.DocumentData> => {
  // Reference to the Firestore collection
  const collectionRef = firestore().collection('users');
  // Query to find document by uid
  const query = collectionRef.where('uid', '==', uid);

  // Update the document
  await query.get({ source: 'server' }).then((snapshot) => {
    const userDoc = snapshot?.docs?.[0];
    collectionRef.doc(userDoc.id).update({
      ...userData
    });
  });

  // Fetch the updated user
  const updateUserPromise = query.get({ source: 'server' }).then((snapshot) => {
    return snapshot?.docs?.[0]?.data();
  });

  asyncAction(updateUserPromise, accountActions.updateUser, dispatch);
  return updateUserPromise;
};
