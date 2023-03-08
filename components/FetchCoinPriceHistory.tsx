import axios from 'axios'
import useSWR from 'swr'

const fetcher = async (url: string) => await axios.get(url).then((res) => res.data);

export default function FetchCoinPriceHistory(coin: any): JSX.Element {
    // ! 1514793600 -- starting on Mon Jan 01 2018 08:00:00 GMT+0000
    const address = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart/range?vs_currency=usd&from=1514793600&to=1678254666`;
    const { data } = useSWR(address, fetcher);

    // if (error) return console.error('error loading data', error');

    // data.prices[0][1] is the USD price of the coin
    // granularity is 1 day
    // console.table(data.prices);
    return data;
}
