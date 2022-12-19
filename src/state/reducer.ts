import { Style } from 'mapbox-gl';
import { AlertType } from '../types';
import { State } from './state';

export type Action =
  | {
      type: 'SET_FILTER';
      payload: string[];
    }
  | {
      type: 'SET_ALERT';
      payload: AlertType[];
    }
  | {
    type: 'SET_STYLE';
    payload: Style;
    }
  |
    {
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
    case 'SET_ALERT':
      return {
        ...state,
        alerts: action.payload
      };
    case 'SET_STYLE':
      return {
        ...state,
        mapstyle: action.payload
      };
    default:
      return state;
  }
};

export const setFilter = (payload: string[]): Action => {
  return {
    type: 'SET_FILTER',
    payload
  };
};

export const setAlerts = (payload: AlertType[]): Action => {
  return {
    type: 'SET_ALERT',
    payload
  };
};

export const setMapStyle = (payload: Style): Action => {
  return {
    type: 'SET_STYLE',
    payload
  };
};

export const setState = (payload: State): Action => {
  return {
    type: 'SET_STATE',
    payload
  };
};
