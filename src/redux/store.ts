import { createStore } from "redux";

import guessWhoApp from "./reducers";

const store = createStore(guessWhoApp);
export const { dispatch } = store;
export default store;
