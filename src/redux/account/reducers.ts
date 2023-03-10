import { Action } from 'redux';
import { accountActions } from './types';

const initialState = {
  data: {},
  loading: false
};

export interface ActionPayload extends Action {
  payload: any;
}

const accountReducer = (state = initialState, action: ActionPayload) => {
  switch (action.type) {
    case accountActions.createAccount.start:
      return {
        ...state,
        loading: true
      };
    case accountActions.createAccount.success:
      const newUser = {
        email: action.payload?.user?.email,
        uid: action.payload?.user?.uid,
        isNewUser: action.payload?.additionalUserInfo?.isNewUser
      };

      return {
        ...state,
        loading: false,
        data: newUser
      };
    case accountActions.createAccount.error:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case accountActions.signin.start:
      return {
        ...state,
        loading: true
      };
    case accountActions.signin.success:
      const user = {
        email: action.payload?.user?.email,
        uid: action.payload?.user?.uid,
        isNewUser: action.payload?.additionalUserInfo?.isNewUser
      };
      return {
        ...state,
        loading: false,
        data: user
      };
    case accountActions.signin.error:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case accountActions.logout.start:
      return {
        ...state,
        loading: true
      };
    case accountActions.logout.success:
      return {
        ...state,
        loading: false,
        data: {}
      };
    case accountActions.logout.error: {
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          error: action.payload
        }
      };
    }
    case accountActions.setUser: {
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload
        }
      };
    }
    default:
      return state;
  }
};

export default accountReducer;
