import { actionTypeGenerator } from "../helpers";

const accountActionGenerator = actionTypeGenerator("ACCOUNT");
export const accountActions = {
  login: accountActionGenerator.async("LOGIN"),
}

type AccountData = {
  id?: string;
  name?: string;
  email?: string;
  token?: string;
}

export interface AccountStore {
  data: AccountData;
}