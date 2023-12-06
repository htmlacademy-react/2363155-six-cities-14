import { FavoriteServerStatus } from '../const';

export type AuthData = {
  login: string;
  password: string;
};

export type UserData = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
};

export type UserComment = {
  offerId: string | undefined;
  comment: string;
  rating: number;
};

export type FavoriteData = {
  offerId: string;
  status: FavoriteServerStatus;
};
