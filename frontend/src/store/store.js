import { configureStore } from "@reduxjs/toolkit";

import languageReducer from "./slices/language";
import cartReducer from "./slices/cart";

const store = configureStore({
  reducer: {
    language: languageReducer,
    cart: cartReducer,
  },
});

export default store;
