import { createSlice } from "@reduxjs/toolkit";

const localState = localStorage.getItem("theme");
const initialState = {
  value: localState ? localState : "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    switchTheme: (state) => {
      state.value = state.value == "dim" ? "light" : "dim";
      localStorage.setItem("theme", state.value);
      document.querySelector("html")?.setAttribute("data-theme", state.value);
    },
  },
});

export const { switchTheme } = themeSlice.actions;

export default themeSlice.reducer;
