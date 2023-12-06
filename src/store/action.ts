import { createAction } from '@reduxjs/toolkit';
import { OfferType } from '../types/offer-type';

export const changeCity = createAction('changeCity', (value: string) => ({
  payload: value,
}));

export const getOffers = createAction('getOffers', (value: OfferType[]) => ({
  payload: value,
}));

export const changeSortOption = createAction('changeSorting', (value: string) => ({
  payload: value,
}));
