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
        image: { src: string };
        deck: { name: string };
      }[]
    >("cards", {
      filter: { "deck.name": { eq: deck } },
    });
    return data.map(
      (card) =>
        ({ name: card.name, id: card.id, srcUri: card.image.src } as Card)
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
  reducers: {},
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

export const {
  selectAll: selectAllCards,
  selectById: selectCardById,
  selectIds: selectCardIds,

  // Pass in a selector that returns the posts slice of state
} = cardsAdapter.getSelectors((state: RootState) => state.api.cards);

export default apiSlice.reducer;
