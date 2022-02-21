import { Action, Dispatch } from "redux";

type AsyncActionType = { 
  start: string;
  success: string;
  error: string;
};

export const actionTypeGenerator = (prefix: string) => {
  return {
    async: function asyncTypeGenerator(action: string) {
      return {
        start: `${prefix}_${action}_START`,
        success: `${prefix}_${action}_SUCCESS`,
        error: `${prefix}_${action}_ERROR`,
      };
    },
    value: (action: string) => `${prefix}_${action}`
  };
}

export const asyncAction = (
  promise: Promise<any>,
  action: AsyncActionType,
  dispatch: Dispatch<Action>
  ) => {
    dispatch({ type: action.start });
    promise
      .then((value: any) => dispatch({
        type: action.success,
        payload: value
      }))
      .catch((error: any) => dispatch({
        type: action.error,
        error
      }));
}