import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../../const';
import { NameSpace } from '../../const';
import { CityLabel } from '../../types/city-name';

type CityState = {
  city: string;
}

const initialState: CityState = {
  city: DEFAULT_CITY,
};

export const citySlice = createSlice({
  name: NameSpace.City,
  initialState,
  reducers: {
    changeCity(state, action: PayloadAction<CityLabel>) {
      state.city = action.payload;
    }
  },
});

export const { changeCity } = citySlice.actions;
