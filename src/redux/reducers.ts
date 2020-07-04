import { Action } from "redux";

interface Card {
  name: string;
  srcUri: string;
  id: number;
}

interface State {
  cards: Set<Card>;
  deck: string;
}

function deckReducer(state: State, action: Action): State {
  return state;
}
