import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { OfferType } from '../types/offer-type';
import { Comment } from '../types/comment';
import {APIRoute} from '../const';
// import { requireAuthorization, setError, setOffersDataLoadingStatus, getOffer } from './action';
// import {saveToken, dropToken} from '../services/token';
// import { requireAuthorization, setError, setOffersDataLoadingStatus, getOffer } from './action';
// import {saveToken, dropToken} from '../services/token';
// import { AuthData, UserData } from '../types/api-data';
// import { TIMEOUT_SHOW_ERROR } from '../const';
// import { store } from './index';


type Extra = {
  extra: AxiosInstance;
}

export const fetchOffers = createAsyncThunk<OfferType[], undefined, Extra>(
  'data/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferType[]>(APIRoute.Offers);
    return data;
  },
);

export const fetchCurrentOffer = createAsyncThunk<OfferType, string | undefined, Extra>(
  'data/fetchCurrentOffer',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<OfferType>(`${APIRoute.Offers}/${offerId}`);
    return data;
  },
);

export const fetchOfferComments = createAsyncThunk<Comment[], string | undefined, Extra>(
  'data/fetchOfferComments',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${offerId}`);
    return data;
  },
);


// export const fetchOffers = createAsyncThunk<void, undefined, ThunkApiConfig>(
//   'data/fetchOffers',
//   async (_arg, {dispatch, extra: api}) => {
//     dispatch(setOffersDataLoadingStatus(true));
//     const {data} = await api.get<OfferType[]>(APIRoute.Offers);
//     dispatch(setOffersDataLoadingStatus(false));
//     dispatch(getOffers(data));
//   },
// );


// export const fetchCurrentOffer = createAsyncThunk<void, string | undefined, ThunkApiConfig>(
//   'data/fetchCurrentOffer',
//   async (offerId, { dispatch, extra: api }) => {
//     dispatch(setOffersDataLoadingStatus(true));
//     const { data } = await api.get<OfferType>(`${APIRoute.Offers}/${offerId}`);
//     dispatch(setOffersDataLoadingStatus(false));
//     dispatch(getOffer(data));
//   }
// );

// export const checkAuthAction = createAsyncThunk<void, undefined, {
//   dispatch: AppDispatch;
//   state: State;
//   extra: AxiosInstance;
// }>(
//   'user/checkAuth',
//   async (_arg, {dispatch, extra: api}) => {
//     try {
//       await api.get(APIRoute.Login);
//       dispatch(requireAuthorization(AuthorizationStatus.Auth));
//     } catch {
//       dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
//     }
//   },
// );

// export const loginAction = createAsyncThunk<void, AuthData, {
//   dispatch: AppDispatch;
//   state: State;
//   extra: AxiosInstance;
// }>(
//   'user/login',
//   async ({login: email, password}, {dispatch, extra: api}) => {
//     const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
//     saveToken(token);
//     dispatch(requireAuthorization(AuthorizationStatus.Auth));
//   },
// );

// export const logoutAction = createAsyncThunk<void, undefined, {
//   dispatch: AppDispatch;
//   state: State;
//   extra: AxiosInstance;
// }>(
//   'user/logout',
//   async (_arg, {dispatch, extra: api}) => {
//     await api.delete(APIRoute.Logout);
//     dropToken();
//     dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
//   },
// );

// export const clearErrorAction = createAsyncThunk(
//   'clearError',
//   () => {
//     setTimeout(
//       () => store.dispatch(setError(null)),
//       TIMEOUT_SHOW_ERROR,
//     );
//   },
// );
