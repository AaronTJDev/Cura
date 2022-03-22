import accountReducer from './account/reducers';
import { ActionPayload } from './account/reducers';

interface RootReducer {
  account: any;
}

export default function rootReducer(
  state = {} as RootReducer,
  action: ActionPayload,
) {
  return {
    account: accountReducer(state.account, action),
  };
}
