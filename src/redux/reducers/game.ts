/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";

import { Card } from "../types";

import { fetchCards } from "./api";

interface GameSliceState {
  deck?: string;
  playerCard?: Card;
  opponentCard?: Card;
}

export const gameSlice = createSlice({
  name: "game",
  initialState: {} as GameSliceState,
  reducers: {
    setDeck: (state, action: PayloadAction<string>): void => {
      state.deck = action.payload;
    },
    setPlayerCard: (state, action: PayloadAction<Card>): void => {
      state.playerCard = action.payload;
    },
    setOpponentCard: (state, action: PayloadAction<Card>): void => {
      state.opponentCard = action.payload;
    },
  },
});

export const { setDeck, setPlayerCard, setOpponentCard } = gameSlice.actions;

export const setDeckAndCards = (deck: string) => (dispatch: Dispatch): void => {
  dispatch(setDeck(deck));
  fetchCards(deck);
};

export default gameSlice.reducer;
