import axios from "axios";

export const getCoinList = async () => {
  const { data } = await axios.get(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true"
  );
  return data;
};

export const getCurrentPrice = (coinId) =>
  new WebSocket(`wss://ws.coincap.io/prices?assets=${coinId}`);

export const HistoricalChart = async (id, days = 7, currency) => {
  const { data } = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
  );
  return data;
};

export const getCoinOverView = async (id) => {
  const { data } = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}`
  );
  return data;
};

export function numberWithCommas(x) {
  return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
