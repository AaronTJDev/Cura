import { Dispatch } from 'redux';
import auth from '@react-native-firebase/auth';

/** Helpers */
import { accountActions } from './types';
import { asyncAction, genericAction } from '../helpers';
import { NormalizedUser } from '../../lib/helpers/auth';

export const signin = (dispatch: Dispatch, email: string, password: string) => {
  const signinPromise = auth().signInWithEmailAndPassword(email, password);
  asyncAction(signinPromise, accountActions.signin, dispatch);
  return signinPromise;
};

export const createUserWithEmailAndPassword = (
  dispatch: Dispatch,
  email: string,
  password: string
) => {
  const accountCreatePromise = auth().createUserWithEmailAndPassword(
    email,
    password
  );
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
