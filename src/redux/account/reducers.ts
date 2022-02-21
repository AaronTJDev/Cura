import { Action, createStore } from "redux";
import { accountActions } from "./types";

const initialState = {
  data: {}
}

interface ActionPayload extends Action { payload: any }

const accountReducer = (state = initialState, action: ActionPayload) => {
  switch (action.type) {
    case accountActions.login.start:
      return {
        ...state,
        loading: true,
      };
    case accountActions.login.success:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case accountActions.login.error:
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