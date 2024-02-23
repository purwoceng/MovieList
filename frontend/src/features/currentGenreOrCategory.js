import { createSlice } from "@reduxjs/toolkit";

export const genreOrCategory = createSlice({
  name: "genreOrCategory",
  initialState: {
    genreIdOrCategoryName: "",
    page: 1,
    searchQuery: "",
  },
  reducers: {
    selectGenreOrCategory: (state, action) => {
      console.log(action.payload);
      state.genreIdOrCategoryName = action.payload;
    },
    searchMovie: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { selectGenreOrCategory } = genreOrCategory.actions;
export default genreOrCategory.reducer;

export const { searchMovie } = {
  searchMovie: (state, action) => {
    state.searchQuery = action.payload;
    state.page = 1;
    state.genreIdOrCategoryName = "";
  },
};
