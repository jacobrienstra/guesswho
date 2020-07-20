/* eslint-disable no-param-reassign */
import Hashids from "hashids";
import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";

import { Card } from "../types";
import type { RootState } from "../store";

import {
  fetchCards,
  removeCards,
  selectCardEntities,
  selectCardIds,
} from "./api";

interface GameSliceState {
  deck?: string;
  playerCard?: number;
  playerName?: string;
  opponentCode?: string;
  opponentCard?: number;
  oppCardError?: string;
  gameCards?: Card[];
  isPlaying?: boolean;
}

export const gameSlice = createSlice({
  name: "game",
  initialState: {} as GameSliceState,
  reducers: {
    setDeck: (state, action: PayloadAction<string | undefined>): void => {
      state.deck = action.payload;
    },
    setPlayerCard: (state, action: PayloadAction<Card | undefined>): void => {
      state.playerCard = action.payload?.id;
    },
    setPlayerName: (state, action: PayloadAction<string | undefined>): void => {
      const value = action.payload?.replace("-", "_");
      state.playerName = value;
    },
    setOpponentCode: (
      state,
      action: PayloadAction<string | undefined>
    ): void => {
      state.opponentCode = action.payload;
    },
    setOpponentCard: (state, action: PayloadAction<number>): void => {
      state.opponentCard = action.payload;
    },
    setOppCardError: (
      state,
      action: PayloadAction<string | undefined>
    ): void => {
      state.oppCardError = action.payload;
    },
    unSetOpponentAndGameCards: (state): void => {
      state.opponentCard = undefined;
      state.gameCards = undefined;
    },
    setGameCards: (state, action: PayloadAction<Card[]>): void => {
      state.gameCards = action.payload;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>): void => {
      state.isPlaying = action.payload;
    },
  },
});

export const {
  setDeck,
  setPlayerCard,
  setPlayerName,
  unSetOpponentAndGameCards,
  setIsPlaying,
  setOppCardError,
} = gameSlice.actions;

const { setOpponentCard, setOpponentCode, setGameCards } = gameSlice.actions;

export const setDeckAndCards = (deck: string) => (
  dispatch: Dispatch<any>
): void => {
  dispatch(setDeck(deck));
  if (deck != null) {
    dispatch(fetchCards(deck));
  } else {
    removeCards();
  }
};

// shuffles in place
function shuffle(array: Array<any>): void {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    // swap elements array[i] and array[j]
    // we use "destructuring assignment" syntax to achieve that
    // you'll find more details about that syntax in later chapters
    // same can be written as:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export const endGame = () => (dispatch: Dispatch<any>): void => {
  dispatch(setDeck(undefined));
  dispatch(setPlayerCard(undefined));
  dispatch(setPlayerName(undefined));
  dispatch(unSetOpponentAndGameCards());
  dispatch(setOppCardError(undefined));
  dispatch(setIsPlaying(false));
};

export const setOpponentCardAndGameCardsFromHash = (code: string) => (
  dispatch: Dispatch<any>,
  getState: () => RootState
): void => {
  const state = getState();
  const [oppName, hash] = code.split("-");
  if (!hash || !oppName) {
    dispatch(
      setOppCardError(
        `Malformed opponent code. Should be: [Opponent's name]-[opponent's code]`
      )
    );
    return;
  }
  dispatch(setOppCardError(undefined));
  dispatch(setOpponentCode(code));
  const decoder = new Hashids(oppName.toLowerCase());
  const [id] = decoder.decode(hash) as number[];
  const cardDict = selectCardEntities(state);
  const opponentCardCard = cardDict[id];
  if (!opponentCardCard) {
    dispatch(
      setOppCardError(
        `Could not find opponent's card. Make sure you're spelling their name exactly as they entered it.`
      )
    );
    return;
  }
  dispatch(setOppCardError(undefined));
  dispatch(setOpponentCard(id));
  const allWrongCardIds = selectCardIds(state).filter((i) => i !== id);
  shuffle(allWrongCardIds);
  const wrongGameCards = allWrongCardIds
    .slice(0, state.settings.numCards - 1)
    .map((cardId) => cardDict[cardId]) // Should throw error here lol
    .filter(notEmpty);
  const gameCards = [...wrongGameCards, opponentCardCard];
  shuffle(gameCards);
  dispatch(setGameCards(gameCards));
};

export default gameSlice.reducer;
