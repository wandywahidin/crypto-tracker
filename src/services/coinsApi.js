import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const headerAPi = {
  "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
  "X-RapidAPI-Host": process.env.REACT_APP_API_HOST,
}

const createUrl = (url) => ({url, headers: headerAPi})

export const coinsApi = createApi({
  reducerPath: "coins",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://coinranking1.p.rapidapi.com/",
  }),
  endpoints: (builder) => ({
    getAllCoins: builder.query({
      query: (count) => createUrl(`/coins?limit=${count}`)
    }),
    getDetailCoin : builder.query({
      query: (coinId) => createUrl(`/coin/${coinId}`)
    }),
    getOhlcDetail : builder.query({
      query: (coinId) => createUrl(`/coin/${coinId}/ohlc??referenceCurrencyUuid=yhjMzLPhuIDl&interval=day&limit=1`)
    }),
    getPriceHistory : builder.query({
      query : (coinId) => createUrl(`/coin/${coinId}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`)
    })
  }),
});

export const {useGetAllCoinsQuery, useGetDetailCoinQuery, useGetOhlcDetailQuery, useGetPriceHistoryQuery} = coinsApi