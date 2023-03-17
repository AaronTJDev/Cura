import { NormalizedAuthUser } from '../../lib/helpers/auth';
import { actionTypeGenerator } from '../helpers';

const accountActionGenerator = actionTypeGenerator('ACCOUNT');
export const accountActions = {
  signin: accountActionGenerator.async('SIGNIN'),
  logout: accountActionGenerator.async('LOGOUT'),
  createAccount: accountActionGenerator.async('CREATE_ACCOUNT'),
  setUser: accountActionGenerator.value('SET_USER'),
  updateUser: accountActionGenerator.async('UPDATE_USER')
};

export interface AccountStore {
  data: NormalizedAuthUser;
  loading: boolean;
}
