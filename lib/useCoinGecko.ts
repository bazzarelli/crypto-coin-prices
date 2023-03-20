import useSWR from 'swr'
import { newYears2018, today } from '@/lib/utils'
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useCoinGeckoSpotPrice = (coin: string) => {
    const address = `https://api.coingecko.com/api/v3/coins/${coin}`;
    const { data, error } = useSWR(address, fetcher, { refreshInterval: 300000 });
    return {
        data,
        isLoading: !error && !data,
        error,
    };
}

export const useCoinGeckoRangePrice = (coin: string) => {
    const address = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart/range?vs_currency=usd&from=${newYears2018()}&to=${today()}}`;
    const { data, error } = useSWR(address, fetcher);
    return {
        data,
        isLoading: !error && !data,
        error,
    };
}