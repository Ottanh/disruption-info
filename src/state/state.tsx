import React, { createContext, useContext, useReducer } from 'react';
import { Action } from './reducer';

export type State = {
  filter: string[]
};

const initialState: State = {
  filter: []
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  mockState?: State;
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider = ({
  mockState,
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, mockState ? mockState : initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};



export const useStateValue = () => useContext(StateContext);