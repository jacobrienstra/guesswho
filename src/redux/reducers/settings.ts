/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SettingsSliceState {
  numCards: number;
  showName: boolean;
}

export const settingsSlice = createSlice({
  name: "game",
  initialState: {
    numCards: 24,
    showName: false,
  } as SettingsSliceState,
  reducers: {
    setNumCards: (state, action: PayloadAction<number>): void => {
      state.numCards = action.payload;
    },
    setShowName: (state, action: PayloadAction<boolean>): void => {
      state.showName = action.payload;
    },
  },
});

export const { setNumCards, setShowName } = settingsSlice.actions;

export default settingsSlice.reducer;
