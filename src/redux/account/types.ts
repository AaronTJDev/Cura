import { actionTypeGenerator } from '../helpers';

const accountActionGenerator = actionTypeGenerator('ACCOUNT');
export const accountActions = {
  signin: accountActionGenerator.async('SIGNIN'),
  logout: accountActionGenerator.async('LOGOUT'),
  createAccount: accountActionGenerator.async('CREATE_ACCOUNT'),
  setUser: accountActionGenerator.value('SET_USER')
};

type AccountData = {
  id?: string;
  name?: string;
  email?: string;
  token?: string;
};

export interface AccountStore {
  data: AccountData;
  loading: boolean;
}
