import { combineReducers } from "redux";

import {
  MODAL_ACTION,
  SET_MODAL_CONTENT,
  SET_MODAL_SHOWN,
  SetModalShownAction,
  GUESS_WHO_ACTION,
} from "./actions";

interface Card {
  name: string;
  srcUri: string;
  id: number;
}

// interface State {
// cards: Set<Card>;
// deck: string;
//   modal: ModalState;
// }

interface ModalState {
  isShown: boolean;
  title: string;
  content: JSX.Element | null;
  onClose: () => void;
}

const initialModalState: ModalState = {
  isShown: false,
  title: "",
  content: null,
  onClose: () => {},
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
