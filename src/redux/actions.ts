import { Action } from "redux";

export const SET_DECK_NAME = "SET_DECK_NAME";
export const SET_DECK_CARDS = "SET_DECK_CARDS";
export const SET_MYSTERY_CARD_HASH = "SET_MYSTERY_CARD_HASH";

export type SetDeckNameAction = Action<typeof SET_DECK_NAME> & {
  name: string | null;
};

export type SetDeckCardsAction = Action<typeof SET_DECK_CARDS> & {
  srcUris: string[];
};

export type SetMysteryCardHashAction = Action<typeof SET_MYSTERY_CARD_HASH> & {
  hash: string;
};

export type DECK_ACTION =
  | SetDeckCardsAction
  | SetDeckNameAction
  | SetMysteryCardHashAction;

export const SET_NUM_CARDS = "SET_NUM_CARDS";
export const SET_SHOW_NAMES = "SET_SHOW_NAMES";

export type SetNumCardsAction = Action<typeof SET_NUM_CARDS> & {
  numCards: number;
};

export type SetShowNamesAction = Action<typeof SET_SHOW_NAMES> & {
  showNames: boolean;
};

export type SETTINGS_ACTION = SetNumCardsAction | SetShowNamesAction;

export type GUESS_WHO_ACTION = DECK_ACTION & SETTINGS_ACTION;
