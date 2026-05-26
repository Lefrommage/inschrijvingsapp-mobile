import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";

type FavoritesState = {
  favoriteActivityIds: string[];
};

const initialState: FavoritesState = {
  favoriteActivityIds: [],
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<string[]>) => {
      state.favoriteActivityIds = action.payload;
    },
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.favoriteActivityIds.includes(action.payload)) {
        state.favoriteActivityIds.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favoriteActivityIds = state.favoriteActivityIds.filter(
        (id) => id !== action.payload,
      );
    },
    clearFavorites: (state) => {
      state.favoriteActivityIds = [];
    },
  },
});

export const { setFavorites, addFavorite, removeFavorite, clearFavorites } =
  favoriteSlice.actions;

export const selectFavoriteActivityIds = (state: RootState) =>
  state.favorites.favoriteActivityIds;

export default favoriteSlice.reducer;
