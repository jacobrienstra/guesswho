import { Action } from "redux";

export const SET_MODAL_CONTENT = "SET_MODAL";
export const SET_MODAL_SHOWN = "SET_MODAL_SHOWN";

export interface ModalContent {
  title: string;
  onClose: () => void;
  content: JSX.Element;
}

export type SetModalContentAction = Action<typeof SET_MODAL_CONTENT> &
  ModalContent;
export type SetModalShownAction = Action<typeof SET_MODAL_SHOWN> & {
  isShown: boolean;
};

export type MODAL_ACTION = SetModalContentAction | SetModalShownAction;

export type GUESS_WHO_ACTION = MODAL_ACTION;
