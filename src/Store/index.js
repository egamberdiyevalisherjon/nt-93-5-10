import { configureStore } from "@reduxjs/toolkit";
import marketReducer from "./slices/market";

const store = configureStore({
  reducer: {
    market: marketReducer,
  },
});

export default store;
