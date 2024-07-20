// src/utils/slices/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../updateCarts";

// Load cart from localStorage or set initial state
const localItem = localStorage.getItem("cart");
const initialState = localItem
  ? JSON.parse(localItem)
  : {
      cartItems: [],
      shippingAddress: {
        address: "",
        city: "",
        postalCode: "",
        country: "",
      },
      paymentMethod: "paypal",
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.id === item.id);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.id === existItem.id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x.id !== action.payload);
      updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      updateCart(state);
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      updateCart(state);
    },
    resetCart: (state) => {
      return initialState;
    },
  },
});

export const {
  cartItems,
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
