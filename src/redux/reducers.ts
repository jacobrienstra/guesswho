import { combineReducers } from "redux";

import {
  MODAL_ACTION,
  SET_MODAL_CONTENT,
  SET_MODAL_SHOWN,
  SET_DECK_NAME,
  SET_DECK_CARDS,
  DECK_ACTION,
  SetModalShownAction,
  SetDeckNameAction,
  SetDeckCardsAction,
} from "./actions";

function capitalize(s: string): string {
  return s
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getFileName(f: string): string {
  const parts = f.split("/");
  if (parts) {
    const last = parts.pop();
    if (last) return last.split(".")[0];
  }
  return f.split(".")[0];
}

interface Card {
  name: string;
  srcUri: string;
  id: number;
}

export interface State {
  deck: DeckState;
  modal: ModalState;
}

export interface DeckState {
  name: string | null;
  cards: Card[] | null;
}

export interface ModalState {
  isShown: boolean;
  title: string;
  content: JSX.Element | null;
  onClose?: () => void; // Set this in component;
}

const initialModalState: ModalState = {
  isShown: false,
  title: "",
  content: null,
};

const initialDeckState: DeckState = {
  name: null,
  cards: null,
};

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
          ({ name: capitalize(getFileName(uri)), srcUri: uri, id: i } as Card)
      );
      return { ...state, cards };
    }
    default:
      return state;
  }
}

export function modal(
  state: ModalState = initialModalState,
  action: MODAL_ACTION
): ModalState {
  const { type, ...rest } = action;
  switch (type) {
    case SET_MODAL_CONTENT:
      return { ...state, ...rest };
    case SET_MODAL_SHOWN:
      return { ...state, isShown: (action as SetModalShownAction).isShown };
    default:
      return state;
  }
}

const guessWhoApp = combineReducers({ modal, deck });

export default guessWhoApp;
