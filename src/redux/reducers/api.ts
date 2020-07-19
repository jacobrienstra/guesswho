/* eslint-disable no-param-reassign */

import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
  EntityState,
} from "@reduxjs/toolkit";

import { Card, Status, Async, AsyncValue } from "../types";
import type { RootState } from "../store";
import sdk from "../sdk";

// import { RootState } from "../store";
type DeckState = AsyncValue<string[]>;
type CardsState = Async & EntityState<Card>;
interface APISliceState {
  decks: DeckState;
  cards: CardsState;
}

const cardsAdapter = createEntityAdapter<Card>({
  selectId: (card) => card.id,
});
export const initialCardsState = cardsAdapter.getInitialState({
  status: Status.unFetched,
} as Async);

export const fetchCards = createAsyncThunk(
  "fetchCards",
  async (deck: string) => {
    const { data } = await sdk.getItems<
      {
        id: number;
        name: string;
        image: { data: { full_url: string } };
        deck: { name: string };
      }[]
    >("cards", {
      fields: ["id", "name", "image.data.full_url", "deck.name"],
      filter: { "deck.name": { eq: deck } },
    });
    return data.map(
      (card) =>
        ({
          name: card.name,
          id: card.id,
          srcUri: card.image.data.full_url,
        } as Card)
    ) as Card[];
  }
);

export const fetchDecks = createAsyncThunk("fetchDecks", async () => {
  const { data } = await sdk.getItems<{ name: string }[]>("decks", {
    fields: ["name"],
  });
  return data.map((deck) => deck.name);
});

const apiSlice = createSlice({
  name: "api",
  initialState: {
    decks: {
      status: Status.unFetched,
    },
    cards: initialCardsState,
  } as APISliceState,
  reducers: {
    removeCards: (state): void => {
      cardsAdapter.removeAll(state.cards);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCards.pending, (state) => {
      state.cards.status = Status.isPending;
    });
    builder.addCase(fetchCards.fulfilled, (state, action) => {
      state.cards.status = Status.hasSucceeded;
      cardsAdapter.upsertMany(state.cards, action.payload);
    });
    builder.addCase(fetchCards.rejected, (state, action) => {
      state.cards.status = Status.hasFailed;
      state.cards.error = action.error.message;
    });
    builder.addCase(fetchDecks.pending, (state) => {
      state.decks.status = Status.isPending;
    });
    builder.addCase(fetchDecks.fulfilled, (state, action) => {
      state.decks.status = Status.hasSucceeded;
      state.decks.value = action.payload;
    });
    builder.addCase(fetchDecks.rejected, (state, action) => {
      state.decks.status = Status.hasFailed;
      state.decks.error = action.error.message;
    });
  },
});

export const { removeCards } = apiSlice.actions;

export const {
  selectAll: selectAllCards,
  selectById: selectCardById,
  selectIds: selectCardIds,
  selectEntities: selectCardEntities,
} = cardsAdapter.getSelectors((state: RootState) => state.api.cards);

export default apiSlice.reducer;
