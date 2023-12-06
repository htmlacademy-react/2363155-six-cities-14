import { createReducer } from '@reduxjs/toolkit';
import './action.ts';
import { OfferType } from '../types/offer-type';
import { CardOffer } from '../mocks/cardOffer';
import { changeCity, changeSortOption, getOffers } from './action.ts';
import { DEFAULT_CITY } from '../const.ts';

type StateType = {
  city: string;
  offers: OfferType[];
  sortingOption: string;
};

const InitialState : StateType = {
  city: DEFAULT_CITY,
  offers: CardOffer,
  sortingOption: 'Popular',
};

export const reducer = createReducer(InitialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(getOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeSortOption, (state, action) => {
      state.sortingOption = action.payload;
    });
});
