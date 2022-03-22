import { Dispatch } from 'redux';
import auth from '@react-native-firebase/auth';

/** Helpers */
import { accountActions } from './types';
import { asyncAction } from '../helpers';

export const login = (
  dispatch: Dispatch,
  email: string,
  password: string
  ) => {
  const loginPromise = auth().signInWithEmailAndPassword(
    email,
    password
  )
  asyncAction(loginPromise, accountActions.login, dispatch);
  return loginPromise;
};

export const createUserWithEmailAndPassword = (
  dispatch: Dispatch,
  email: string,
  password: string,
) => {
  const accountCreatePromise = auth().createUserWithEmailAndPassword(
    email,
    password,
  );
  asyncAction(accountCreatePromise, accountActions.createAccount, dispatch);
  return accountCreatePromise;
};
