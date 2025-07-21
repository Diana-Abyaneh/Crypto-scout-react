const BASE_URL = "https://api.coingecko.com/api/v3";
const API_KEY = import.meta.env.VITE_CRYPTO_API_KEY;

const getCoinList = (page, currency) => {
  return `${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=${page}&x_cg_demo_api_key=${API_KEY}`;
};

const coinSearch = (query) => {
  return `${BASE_URL}/search?query=${query}&x_cg_demo_api_key=${API_KEY}`;
};

const getChart = (id, currency = "usd") =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=7`;

const getCoin = (id) => {
  return `${BASE_URL}/coins/${id}?x_cg_demo_api_key=${API_KEY}`;
};

export { getCoinList, coinSearch, getChart, getCoin };

