import { Dispatch } from 'redux';
import firebase from '@react-native-firebase/app';

/** Helpers */
import { accountActions } from './types';
import { asyncAction } from '../helpers';
import { logError } from '../../lib/helperes';

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
    console.log('email', email, 'password', password);
    const app = firebase.app();
    const accountCreatePromise = 
      app.auth().createUserWithEmailAndPassword(email, password)
        .then((res) => {
          console.log('account created', res);
        })
        .catch(error => {
          logError(error);
        });
    // asyncAction(accountCreatePromise, accountActions.createAccount, dispatch);
    return accountCreatePromise;
}