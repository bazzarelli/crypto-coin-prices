import useSWR from "swr";

import { oneYearAgoFromNow, today, todayToISOString } from "../lib/utils";
const cache = new Map();

const fetcher = async (url: string) => {
  if (!cache.has(url)) {
    const response = await fetch(url);
    const data = await response.json();
    cache.set(url, data);
    // Cache the data for 5 minutes
    setTimeout(() => cache.delete(url), 5 * 60 * 1000);
  }
  return cache.get(url);
};

const capitalize = (s: string | string[]) =>
  (s && s[0].toUpperCase() + s.slice(1)) || "";

const fetcherForCoin = (url: string) => fetch(url).then((res) => res.json());

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
