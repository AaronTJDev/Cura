import { RootStateOrAny } from 'react-redux';
import { FirestoreUser } from '../../lib/helpers/auth';

export const getAccount = (state: RootStateOrAny): FirestoreUser => {
  return state?.account?.data;
};

export const getIsLoggedIn = (state: RootStateOrAny) => {
  return !!state?.account?.data?.email;
};

export const getIsNewUser = (state: RootStateOrAny) => {
  return state?.account?.data?.additionalUserInfo?.isNewUser;
};

export const getIsAccountLoading = (state: RootStateOrAny) => {
  return state?.account?.loading;
};

export const getUid = (state: RootStateOrAny) => {
  return state?.account?.data?.uid;
};
