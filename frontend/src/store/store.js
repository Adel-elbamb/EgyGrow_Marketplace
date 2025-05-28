import { configureStore } from "@reduxjs/toolkit";

import languageReducer from './slice/language'

const store=configureStore({
    reducer:{

        language: languageReducer,

    }
});

export default store;
