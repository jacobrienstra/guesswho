import { configureStore } from "@reduxjs/toolkit";

import { gameReducer, settingsReducer, apiReducer } from "./reducers";

const store = configureStore({
  reducer: { game: gameReducer, settings: settingsReducer, api: apiReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
