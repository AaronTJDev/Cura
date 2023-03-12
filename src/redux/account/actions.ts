import { Dispatch } from 'redux';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

/** Helpers */
import { accountActions } from './types';
import { asyncAction, genericAction } from '../helpers';
import { NormalizedUser, normalizeUser } from '../../lib/helpers/auth';

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
    .collection('Users')
    .where('username', '==', username)
    .get()
    .then((snapshot) => {
      if (!snapshot.empty) {
        throw new Error(`User with username: ${username} already exists`);
      }
      return snapshot;
    })
    .then(() => {
      return auth().createUserWithEmailAndPassword(email, password);
    })
    .then((userData) => {
      if (userData.user) {
        firestore()
          .collection('Users')
          .add({
            ...normalizeUser(userData.user),
            username
          });
      }
    });

  asyncAction(accountCreatePromise, accountActions.createAccount, dispatch);
  return accountCreatePromise;
};

export const logout = (dispatch: Dispatch) => {
  const logoutPromise = auth()
    .signOut()
    .then((res) => {
      console.log('result from logout', res);
    })
    .catch((err) => {
      console.log('error from logout', err);
    });
  asyncAction(logoutPromise, accountActions.logout, dispatch);
  return logoutPromise;
};

export const setUser = (dispatch: Dispatch, user: NormalizedUser) => {
  genericAction(accountActions.setUser, user, dispatch);
};
