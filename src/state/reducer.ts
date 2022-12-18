import { State } from './state';

export type Action =
  | {
      type: 'SET_FILTER';
      payload: string | null;
    }
  | {
      type: 'SET_STATE';
      payload: State;
    }


export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_STATE':
      return action.payload;
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };
    default:
      return state;
  }
};


export const setUser = (payload: string): Action => {
  return {
    type: 'SET_FILTER',
    payload
  };
};

export const setState = (payload: State): Action => {
  return {
    type: 'SET_STATE',
    payload
  };
};
