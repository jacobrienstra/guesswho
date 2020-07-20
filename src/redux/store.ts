import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { persistStore, persistReducer } from "redux-persist";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { gameReducer, settingsReducer, apiReducer } from "./reducers";

const persistConfig = {
  key: "guesswho",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    game: gameReducer,
    settings: settingsReducer,
    api: apiReducer,
  })
);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export default store;
