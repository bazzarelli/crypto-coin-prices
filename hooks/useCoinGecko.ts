import useSWR from "swr";

import { oneYearAgoFromNow, today, todayToISOString } from "../lib/utils";

type CoinData = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: null | {
    times: number;
    currency: string;
    percentage: number;
  };
  last_updated: string;
};

type CoinGeckoResponse = CoinData[];
const cache = new Map();

const fetcher = async (url: string) => {
  if (!cache.has(url)) {
    const response = await fetch(url);
    const data = await response.json();
    cache.set(url, data);
    // Cache the data for 1 minute
    setTimeout(() => cache.delete(url), 1 * 60 * 1000);
  }
  return cache.get(url);
};

const capitalize = (s: string | string[]) =>
  (s && s[0].toUpperCase() + s.slice(1)) || "";

const fetcherForCoin = (url: string) => fetch(url).then((res) => res.json());

export const useCoinGeckoListMarket = (coins: string[]) => {
  const address = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coins.join(
    ","
  )}&x_cg_api_key=${process.env.NEXT_PUBLIC_GECKO_API_KEY}`;

  const { data } = useSWR(address, fetcherForCoin, {
    refreshInterval: 61000,
    fallbackData: [],
  });
  return { data: data as CoinGeckoResponse };
};

export const useCoinGeckoSpotPrice = (coin: string) => {
  const address = `https://api.coingecko.com/api/v3/coins/${coin}`;
  const coinCapitalized = capitalize(coin);
  const { data } = useSWR(address, fetcherForCoin, {
    refreshInterval: 15000,
    fallbackData: {
      id: "coin",
      symbol: "-",
      image: {
        small: "/wind-spinner.svg",
      },
      name: coinCapitalized,
      coin: coin,
      last_updated: todayToISOString(),
      market_data: {
        current_price: {
          usd: 0,
        },
      },
    },
  });
  return { data };
};

export const useCoinGeckoRangePrice = (
  coin: string,
  apiKey: string | undefined
) => {
  const address = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart/range?vs_currency=usd&from=${oneYearAgoFromNow()}&to=${today()}&x_cg_demo_api_key=${apiKey}`;
  const { data, error } = useSWR(address, fetcher, {
    revalidateOnMount: true,
    revalidateIfStale: false, // Do not revalidate if the data is stale
    revalidateOnFocus: false, // Do not revalidate when the window regains focus
  });

  const prices = data && data.prices;

  return {
    prices,
    error,
  };
};
