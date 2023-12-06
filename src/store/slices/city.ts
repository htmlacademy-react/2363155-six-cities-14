import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_CITY } from '../../const';
import { NameSpace } from '../../const';

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
    changeCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    }
  },
});

export const { changeCity } = citySlice.actions;
