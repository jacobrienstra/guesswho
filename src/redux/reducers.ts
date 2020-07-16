import { combineReducers } from "redux";
import CryptoJS from "crypto-js";

import { nameCase, getFileName } from "../util";

import {
  SET_DECK_NAME,
  SET_DECK_CARDS,
  DECK_ACTION,
  SETTINGS_ACTION,
  SET_NUM_CARDS,
  SET_SHOW_NAMES,
  SetNumCardsAction,
  SetShowNamesAction,
  SetDeckNameAction,
  SetDeckCardsAction,
  SET_MYSTERY_CARD_HASH,
  SetMysteryCardHashAction,
} from "./actions";

export interface Card {
  name: string;
  srcUri: string;
  id: number;
  hash: string;
}

export interface State {
  deck: DeckState;
  settings: SettingsState;
}

export interface SettingsState {
  numCards: number;
  showNames: boolean;
}

export interface DeckState {
  name: string | null;
  cards: Card[] | null;
  hash: string | null;
}

const initialDeckState: DeckState = {
  name: null,
  cards: null,
  hash: null,
};

const initialSettingsState: SettingsState = {
  numCards: 24,
  showNames: false,
};

export function settings(
  state: SettingsState = initialSettingsState,
  action: SETTINGS_ACTION
): SettingsState {
  switch (action.type) {
    case SET_NUM_CARDS:
      return { ...state, numCards: (action as SetNumCardsAction).numCards };
    case SET_SHOW_NAMES:
      return { ...state, showNames: (action as SetShowNamesAction).showNames };
    default:
      return state;
  }
}

export function deck(
  state: DeckState = initialDeckState,
  action: DECK_ACTION
): DeckState {
  switch (action.type) {
    case SET_DECK_NAME:
      return { ...state, name: (action as SetDeckNameAction).name };
    case SET_DECK_CARDS: {
      const cards: Card[] = (action as SetDeckCardsAction).srcUris.map(
        (uri, i) =>
          ({
            name: nameCase(getFileName(uri)),
            srcUri: uri,
            id: i,
            hash: CryptoJS.AES.encrypt(uri, "secret").toString(),
          } as Card)
      );
      return { ...state, cards };
    }
    case SET_MYSTERY_CARD_HASH:
      return { ...state, hash: (action as SetMysteryCardHashAction).hash };
    default:
      return state;
  }
}

const guessWhoApp = combineReducers({ deck, settings });

export default guessWhoApp;
