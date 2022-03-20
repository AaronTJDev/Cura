import { RootStateOrAny } from 'react-redux';

export const getAccount = (state: RootStateOrAny) => {
  return state?.account?.data
};

export const getIsAccountLoading = (state: RootStateOrAny) => {
  return state?.account?.loading;
};