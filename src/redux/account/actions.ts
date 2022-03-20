import { Dispatch } from 'redux';
import auth from '@react-native-firebase/auth';

/** Helpers */
import { accountActions } from './types';
import { asyncAction } from '../helpers';

export const login = (dispatch: Dispatch) => {
  const promise = new Promise((resolve, reject) => {
    const random = Math.random();
    setTimeout(() => {
      if (random > 0.5) {
        resolve({
          id: '1',
          name: 'John Doe',
          email: ''
        })
      } else {
        reject('Login failed');
      }
    }, 1000)
  });
  asyncAction(promise, accountActions.login, dispatch);
  return promise;
}

export const createUserWithEmailAndPassword = 
  (
    dispatch: Dispatch,
    email: string,
    password: string
  ) => {
    const accountCreatePromise = auth().createUserWithEmailAndPassword(email, password);
    asyncAction(accountCreatePromise, accountActions.createAccount, dispatch);
    return accountCreatePromise;
}