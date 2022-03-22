import {actionTypeGenerator} from '../helpers';

const accountActionGenerator = actionTypeGenerator('ACCOUNT');
export const accountActions = {
  login: accountActionGenerator.async('LOGIN'),
  createAccount: accountActionGenerator.async('CREATE_ACCOUNT'),
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
