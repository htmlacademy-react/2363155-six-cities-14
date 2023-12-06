import { Location } from './types/location';

type TCity = {
  name: string;
  location: Location;
}

export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;

export const DEFAULT_CITY = 'Paris';

export const DEFAULT_SORTING = 'Popular';

export const TIMEOUT_SHOW_ERROR = 2000;

export const MAX_COMMENT_COUNT = 10;

export const MAX_OFFER_IMAGES_COUNT = 6;

export const CITIES_MAP : TCity[] = [
  {
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    },
    name: 'Paris',
  },
  {
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13,
    },
    name: 'Cologne',
  },
  {
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13,
    },
    name: 'Brussels',
  },
  {
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13,
    },
    name: 'Amsterdam',
  },
  {
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13,
    },
    name: 'Hamburg',
  },
  {
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13,
    },
    name: 'Dusseldorf',
  }
];

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
  OfferId = ':id',
  Error = '*',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Offers = '/offers',
  Nearby = '/nearby',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout'
}

export enum NameSpace {
  Offers = 'offers',
  User = 'user',
  City = 'city'
}

export enum RequestStatus {
  Idle = 'idle',
  Pending = 'pending',
  Fulfilled = 'fulfilled',
  Rejected = 'rejected',
}

export enum FavoriteServerStatus {
  Add = 1,
  Delete = 0,
}
