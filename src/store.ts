import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { State, Person } from './types';

const initialState: State = {
  tasks: [],
  people: {}
};

export const { actions, reducer } = createSlice({
  name: 'store',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Partial<State>>) => ({ ...state, ...action.payload }),
    setPerson: (state, action: PayloadAction<Partial<Person>>) => {
      if (!action.payload.id) return;

      const prev = state.people[action.payload.id];

      if (prev?.focus === 'name') delete action.payload.name;

      if (prev?.focus === 'description') delete action.payload.description;

      state.people = {
        ...state.people,
        [action.payload.id]: {
          ...prev,
          ...action.payload
        }
      };
    },
    setPersonForce: (state, action: PayloadAction<Partial<Person>>) => {
      if (!action.payload.id) return;

      state.people = {
        ...state.people,
        [action.payload.id]: {
          ...state.people[action.payload.id],
          ...action.payload
        }
      };
    }
  }
});

const store = configureStore({
  reducer,
  devTools: true
});

export default store;

export { useDispatch } from 'react-redux';

export const useSelector: TypedUseSelectorHook<State> = useReduxSelector;
