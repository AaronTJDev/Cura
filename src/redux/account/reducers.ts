import { Action } from "redux";
import { accountActions } from "./types";

const initialState = {
  data: {},
  loading: false
}

export interface ActionPayload extends Action { payload: any }

const accountReducer = (state = initialState, action: ActionPayload) => {
  switch (action.type) {
    case accountActions.createAccount.start:
      return {
        ...state,
        loading: true,
      };
    case accountActions.createAccount.success:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case accountActions.createAccount.error:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}

export default accountReducer;