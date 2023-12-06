import {configureStore, combineReducers} from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { offerSlice } from './slices/offers.ts';
import { citySlice } from './slices/city';
import { userSlice } from './slices/user';
export const api = createAPI();
import { NameSpace } from '../const';
import { redirect } from './middlewares/redirect';

export const reducer = combineReducers({
  [NameSpace.City]: citySlice.reducer,
  [NameSpace.Offers]: offerSlice.reducer,
  [NameSpace.User] : userSlice.reducer,
});

// регистрация thunk в конфигурации хранилища.
export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});
