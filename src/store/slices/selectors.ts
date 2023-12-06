import { State } from '../../types/state';

export const getCurrentCityOffers = (state: State) => {
  const offersList = state.offers.offers;
  const currentCity = state.city.city;
  return offersList.filter((offer) => offer.city.name === currentCity);
};

export const getSortingOption = (state: State) => state.offers.sortingOption;

export const getCurrentOffer = (state: State) => state.offers.currentOffer;

export const getCurrentComments = (state: State) => state.offers.currentOfferComments;

export const getNearbyOffers = (state: State) => state.offers.nearbyOffers;

export const getAuthStatus = (state: State) => state.user.authorizationStatus;
