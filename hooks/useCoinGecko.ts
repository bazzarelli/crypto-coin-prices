"use client"

import useSWR from 'swr'
import { newYears2018, today } from '../lib/utils'
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useCoinGeckoSpotPrice = (coin: string) => {
    const address = `https://api.coingecko.com/api/v3/coins/${coin}`;
    const { data } = useSWR(address, fetcher, {
        suspense: true,
        refreshInterval: 60000,
        fallbackData: {
            id: 'coin',
            symbol: '---',
            image: {
                small: '',
            },
            name: 'coin',
            coin: 'coin',
            last_updated: '2023-01-01T00:00:00.000Z',
            market_data: {
                current_price: {
                    usd: 0,
                },
            },
        },
    });
    return { data };
}

export const useCoinGeckoRangePrice = (coin: string) => {
    const address = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart/range?vs_currency=usd&from=${newYears2018()}&to=${today()}}`;
    const { data, isLoading } = useSWR(address, fetcher);
    return {
        data,
        isLoading,
    };
}