import { createAction } from '@reduxjs/toolkit';
import { OfferType } from '../types/offer-type';

export const changeCity = createAction<string>('changeCity');

export const getOffers = createAction<OfferType[]>('getOffers');

export const changeSortOption = createAction<string>('changeSorting');
