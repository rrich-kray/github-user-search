import { createSlice, configureStore } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    darkTheme: true,
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkTheme = !state.darkTheme;
    },
  },
});

const store = configureStore({
  reducer: themeSlice.reducer,
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
