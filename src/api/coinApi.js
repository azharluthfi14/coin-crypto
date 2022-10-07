import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const coinApiHeaders = {
  "x-rapidapi-host": import.meta.env.VITE_RAPIDAPI_HOST,
  "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: coinApiHeaders });

export const coinApi = createApi({
  reducerPath: "coinApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCoins: builder.query({
      query: (count) => createRequest(`coins?limit=${count}`),
    }),
    getStableCoins: builder.query({
      query: (count) =>
        createRequest(
          `coins?timePeriod=24h&tags%5B0%5D=metaverse&orderBy=marketCap&limit=${count}&offset=0`
        ),
    }),
    getCoinHistory: builder.query({
      query: ({ timeperiod, coinId }) =>
        createRequest(`coin/${coinId}/history?timePeriod=${timeperiod}`),
    }),
    getCoinDetails: builder.query({
      query: (coinId) => createRequest(`coin/${coinId}`),
    }),
  }),
});

// Custom hook
export const {
  useGetCoinsQuery,
  useGetStableCoinsQuery,
  useGetCoinHistoryQuery,
  useGetCoinDetailsQuery,
} = coinApi;
