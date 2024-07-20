import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import cartSliceReducer from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
    themeReducer,
  },
  devTools: true,
});
