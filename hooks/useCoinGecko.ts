import useSWR from "swr";

import { oneYearAgoFromNow, today } from "../lib/utils";
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

export const useCoinGeckoSpotPrice = (coin: string) => {
  const address = `https://api.coingecko.com/api/v3/coins/${coin}`;
  const { data } = useSWR(address, fetcher, {
    suspense: true,
    refreshInterval: 0,
    fallbackData: {
      id: "coin",
      symbol: "---",
      image: {
        small: "",
      },
      name: "coin",
      coin: "coin",
      last_updated: "2024-01-01T00:00:00.000Z",
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
