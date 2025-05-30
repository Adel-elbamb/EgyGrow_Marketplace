import { configureStore } from "@reduxjs/toolkit";

import languageReducer from './slice/language'
import cartReducer from './slice/cartSlice';
const store=configureStore({
    reducer:{

        language: languageReducer,
        cart: cartReducer,

    }
});

export default store;
