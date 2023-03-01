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
    removeMarketData(state) {
      state.info = null;
    },
  },
});

export const { loadMarketData, removeMarketData } = marketSlice.actions;

const marketReducer = marketSlice.reducer;

export default marketReducer;
