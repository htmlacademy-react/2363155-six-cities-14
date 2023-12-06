import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OfferType } from '../../types/offer-type';
import { fetchOffers, fetchCurrentOffer, fetchOfferComments,fetchOffersNearby, addComment, fetchFavorites, setIsFavorite } from '../api-actions';
import { DEFAULT_SORTING } from '../../const';
import { NameSpace, RequestStatus } from '../../const';
import { Comment } from '../../types/comment';

type OfferState = {
  offers: OfferType[];
  isOffersDataLoading: boolean;
  currentOffer: null | OfferType;
  isCurrentOfferDataLoading: RequestStatus;
  currentOfferComments: Comment[];
  isCommentLoading: RequestStatus;
  nearbyOffers: OfferType[];
  isNearbyOfferDataLoading: RequestStatus;
  favoriteOffers: OfferType[];
  isFavoriteDataLoading: RequestStatus;
  error: null | string;
  sortingOption: string;
}

const initialState: OfferState = {
  offers: [],
  isOffersDataLoading: false,
  currentOffer: null,
  isCurrentOfferDataLoading: RequestStatus.Idle,
  currentOfferComments: [],
  isCommentLoading: RequestStatus.Idle,
  nearbyOffers: [],
  isNearbyOfferDataLoading: RequestStatus.Idle,
  favoriteOffers: [],
  isFavoriteDataLoading: RequestStatus.Idle,
  error: null,
  sortingOption: DEFAULT_SORTING,
};

export const offerSlice = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    changeSortOption(state, action: PayloadAction<string>) {
      state.sortingOption = action.payload;
    },
    dropOffer(state, action: PayloadAction<null | OfferType>) {
      state.currentOffer = action.payload;
    },
    clearFavorites(state) {
      state.favoriteOffers = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.isOffersDataLoading = false;
        state.error = 'Error';
      })
      .addCase(fetchCurrentOffer.pending, (state) => {
        state.isCurrentOfferDataLoading = RequestStatus.Pending;
      })
      .addCase(fetchCurrentOffer.fulfilled, (state, action) => {
        state.isCurrentOfferDataLoading = RequestStatus.Fulfilled;
        state.currentOffer = action.payload;
      })
      .addCase(fetchCurrentOffer.rejected, (state) => {
        state.error = 'Error';
        state.isCurrentOfferDataLoading = RequestStatus.Rejected;
        state.currentOffer = null;
      })
      .addCase(fetchOfferComments.pending, (state) => {
        state.isCurrentOfferDataLoading = RequestStatus.Pending;
      })
      .addCase(fetchOfferComments.fulfilled, (state, action) => {
        state.isCurrentOfferDataLoading = RequestStatus.Fulfilled;
        state.currentOfferComments = action.payload;
      })
      .addCase(fetchOfferComments.rejected, (state) => {
        state.error = 'Error';
        state.currentOfferComments = [];
      })
      .addCase(fetchOffersNearby.pending, (state) => {
        state.isCurrentOfferDataLoading = RequestStatus.Pending;
      })
      .addCase(fetchOffersNearby.fulfilled, (state, action) => {
        state.isCurrentOfferDataLoading = RequestStatus.Fulfilled;
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchOffersNearby.rejected, (state) => {
        state.error = 'Error';
        state.isCurrentOfferDataLoading = RequestStatus.Rejected;
        state.nearbyOffers = [];
      })
      .addCase(addComment.pending, (state) => {
        state.isCommentLoading = RequestStatus.Pending;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.isCommentLoading = RequestStatus.Fulfilled;
        state.currentOfferComments.push(action.payload);
      })
      .addCase(addComment.rejected, (state) => {
        state.error = 'Error';
        state.isCommentLoading = RequestStatus.Rejected;
      })
      .addCase(fetchFavorites.pending, (state) => {
        state.isFavoriteDataLoading = RequestStatus.Pending;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isFavoriteDataLoading = RequestStatus.Fulfilled;
      })
      .addCase(fetchFavorites.rejected, (state) => {
        state.isFavoriteDataLoading = RequestStatus.Rejected;
        state.error = 'Error';
      })
      .addCase(setIsFavorite.pending, (state) => {
        state.isFavoriteDataLoading = RequestStatus.Pending;
      })
      .addCase(setIsFavorite.fulfilled, (state, action) => {
        state.isFavoriteDataLoading = RequestStatus.Fulfilled;

        if (action.payload.isFavorite) {
          state.favoriteOffers.push(action.payload);
        } else {
          state.favoriteOffers = state.favoriteOffers.filter((offer) => offer.id !== action.payload.id);
        }

        if (action.payload.id === state.currentOffer?.id) {
          state.currentOffer = action.payload;
        }
        state.offers = state.offers.map((offer) => (offer.id === action.payload.id) ? action.payload : offer);
        state.nearbyOffers = state.nearbyOffers.map((offer) => (offer.id === action.payload.id) ? action.payload : offer);
      })
      .addCase(setIsFavorite.rejected, (state) => {
        state.isFavoriteDataLoading = RequestStatus.Rejected;
      });
  }
});

export const { changeSortOption, dropOffer, clearFavorites } = offerSlice.actions;
