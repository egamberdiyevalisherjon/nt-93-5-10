import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  info: null,
};

const marketSlice = createSlice({
  name: "market",
  initialState,
  reducers: {
    loadMarketData(state, { payload }) {
      state.info = payload;
    },
  },
});

export const { loadMarketData } = marketSlice.actions;

const marketReducer = marketSlice.reducer;

export default marketReducer;
