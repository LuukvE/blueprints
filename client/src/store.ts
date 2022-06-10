import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { State } from './types';

const initialState: State = {
  status: 'ready',
  error: '',
  name: '',
  email: '',
  body: '',
  messages: []
};

export const { actions, reducer } = createSlice({
  name: 'store',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Partial<State>>) => ({ ...state, ...action.payload })
  }
});

const store = configureStore({
  reducer,
  devTools: true
});

export default store;

export { useDispatch } from 'react-redux';

export const useSelector: TypedUseSelectorHook<State> = useReduxSelector;
