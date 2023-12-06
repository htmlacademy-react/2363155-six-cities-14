import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { NameSpace } from '../../const';
import { loginAction, logoutAction, getCurrentUserData } from '../api-actions';
import { UserData } from '../../types/api-data';
import { RequestStatus } from '../../const';

type UserState = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | Record<string, never>;
  isUserDataLoading: RequestStatus;
};

const initialState : UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: {},
  isUserDataLoading: RequestStatus.Idle,
};

export const userSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    requireAuthStatus(state, action: PayloadAction<AuthorizationStatus>) {
      state.authorizationStatus = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUserData.pending, (state) => {
        state.isUserDataLoading = RequestStatus.Pending;
      })
      .addCase(getCurrentUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isUserDataLoading = RequestStatus.Fulfilled;
      })
      .addCase(getCurrentUserData.rejected, (state) => {
        state.userData = {};
        state.isUserDataLoading = RequestStatus.Rejected;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});

export const {requireAuthStatus} = userSlice.actions;
