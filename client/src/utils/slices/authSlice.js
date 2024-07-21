import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: localStorage.getItem("status") === "true",
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.status = true;
      state.userInfo = action.payload;
      localStorage.setItem("status", true);
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.status = false;
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
