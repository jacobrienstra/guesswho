import { combineReducers } from "redux";

import {
  MODAL_ACTION,
  SET_MODAL_CONTENT,
  SET_MODAL_SHOWN,
  SetModalShownAction,
} from "./actions";

interface Card {
  name: string;
  srcUri: string;
  id: number;
}

export interface State {
  // cards: Set<Card>;
  // deck: string;
  modal: ModalState;
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

const guessWhoApp = combineReducers({ modal });

export default guessWhoApp;
