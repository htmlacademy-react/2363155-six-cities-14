import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { OfferType } from '../types/offer-type';
import { Comment } from '../types/comment';
import {APIRoute, AppRoute, AuthorizationStatus} from '../const';
import { State, AppDispatch } from '../types/state';
import { userSlice } from './slices/user';
import {saveToken, dropToken} from '../services/token';
import { AuthData, UserData, UserComment } from '../types/api-data';
import { redirectToRoute } from './action';
import { FavoriteData } from '../types/api-data';
import { clearFavorites } from './slices/offers';

type Extra = {
  dispatch: AppDispatch;
  state: State;
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

export const fetchOffersNearby = createAsyncThunk<OfferType[], string | undefined, Extra>(
  'data/fetchNearbyOffers',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<OfferType[]>(`${APIRoute.Offers}/${offerId}/nearby`);
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, Extra>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(userSlice.actions.requireAuthStatus(AuthorizationStatus.Auth));
    } catch {
      dispatch(userSlice.actions.requireAuthStatus(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, Extra>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Main));

    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, Extra>(
  'user/logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    clearFavorites();
  },
);

export const getCurrentUserData = createAsyncThunk<UserData, undefined, Extra>(
  'user/getCurrentUserData',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<UserData>(APIRoute.Login);

    return data;
  }
);

export const addComment = createAsyncThunk<Comment, UserComment, Extra>(
  'data/addComment',
  async ({offerId, comment, rating}, { extra: api }) => {
    const { data } = await api.post<Comment>(`${APIRoute.Comments}/${offerId}`, { comment, rating });
    return data;
  }
);


export const fetchFavorites = createAsyncThunk<OfferType[], undefined, Extra>(
  'data/fetchFavorites',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferType[]>(APIRoute.Favorite);
    return data;
  },
);

export const setIsFavorite = createAsyncThunk<OfferType, FavoriteData, Extra>(
  'data/setIsFavorite',
  async ({offerId, status}, { extra: api }) => {
    const { data } = await api.post<OfferType>(`${APIRoute.Favorite}/${offerId}/${status}`, { offerId, status});

    return data;
  }
);
