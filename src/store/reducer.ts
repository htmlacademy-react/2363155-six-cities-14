// import { createReducer } from '@reduxjs/toolkit';
// import './action.ts';
// import { OfferType } from '../types/offer-type';
// import { changeCity, changeSortOption, getOffer, getOffers, requireAuthorization, setError, setOffersDataLoadingStatus } from './action.ts';
// import { DEFAULT_CITY } from '../const.ts';
// import { AuthorizationStatus } from '../const.ts';

// type StateType = {
//   city: string;
//   offers: OfferType[];
//   offer: OfferType | null;
//   offerStatus: string;
//   sortingOption: string;
//   authorizationStatus: AuthorizationStatus;
//   error: string | null;
//   isOfferDataLoading: boolean;
// };

// const InitialState : StateType = {
//   city: DEFAULT_CITY,
//   offers: [],
//   offer: null,
//   offerStatus: '',
//   sortingOption: 'Popular',
//   authorizationStatus: AuthorizationStatus.Unknown,
//   error: null,
//   isOfferDataLoading: false,
// };

// export const reducer = createReducer(InitialState, (builder) => {
//   builder
//     .addCase(changeCity, (state, action) => {
//       state.city = action.payload;
//     })
//     .addCase(getOffers, (state, action) => {
//       state.offers = action.payload;
//     })
//     .addCase(getOffer, (state, action) => {
//       state.offer = action.payload;
//     })
//     .addCase(changeSortOption, (state, action) => {
//       state.sortingOption = action.payload;
//     })
//     .addCase(requireAuthorization, (state, action) => {
//       state.authorizationStatus = action.payload;
//     })
//     .addCase(setError, (state, action) => {
//       state.error = action.payload;
//     })
//     .addCase(setOffersDataLoadingStatus, (state, action) => {
//       state.isOfferDataLoading = action.payload;
//     });
// });
