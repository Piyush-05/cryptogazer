import { createSlice } from "@reduxjs/toolkit";

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    selectedCoin: "",
    coinList: [],
    selectedCurrency: "",
    allCurrencies: [],
    singleCoin: {},
    chartData: [],
    coinOverview: {},
    errorObj: { error: false, msg: "" },
  },
  reducers: {
    setCoinList: (state, action) => {
      state.coinList = action.payload;
    },
    setSelectedCoin: (state, action) => {
      state.selectedCoin = action.payload;
    },
    setAllCurrencies: (state, action) => {
      state.allCurrencies = action.payload;
    },
    setSelectedCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
    },
    setSingleCoin: (state, action) => {
      state.singleCoin = action.payload;
    },
    setChartData: (state, action) => {
      state.chartData = action.payload;
    },
    setCoinOverview: (state, action) => {
      state.coinOverview = action.payload;
    },
    setError: (state, action) => {
      state.errorObj = action.payload;
    },
  },
});

export const {
  setCoinList,
  setSelectedCoin,
  setAllCurrencies,
  setSelectedCurrency,
  setSingleCoin,
  setChartData,
  setCoinOverview,
  setError,
} = cryptoSlice.actions;
export default cryptoSlice.reducer;
