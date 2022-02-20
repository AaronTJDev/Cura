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

type AsyncActionType = { 
  start: string;
  success: string;
  error: string;
};

const loadingReducer = (key: string) => (state: any, action: any) => {
  return {
    ...state,
    [key]: true,
  };
};

const successReducer = (key: string) => (state: any, action: any) => {
  return {
    ...state,
    [key]: action.payload,
  };
};

const errorReducer = (key: string) => (state: any, action: any) => {
  return {
    ...state,
    [key]: action.payload,
  };
};

export function asyncReducer(actionType: AsyncActionType, key: string) {
  return [
    [actionType.start, loadingReducer(key)],
    [actionType.success, successReducer(key)],
    [actionType.error, errorReducer(key)]
  ];
}