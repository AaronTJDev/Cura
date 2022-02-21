import { Action, Dispatch } from 'redux';
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