import axios from 'axios'
import useSWR from 'swr'
import moment from 'moment'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const fetcher = async (url: string) => await axios.get(url).then((res) => res.data);

export default function FetchCoinData(coin: any): JSX.Element {
    const address = `https://api.coingecko.com/api/v3/coins/${coin.coin}`;
    const { data, error } = useSWR(address, fetcher);

    if (error) return <div>error loading data</div>;
    if (!data) return <div>loading...</div>;

    return (
      <>
        <h2 className={inter.className}>
          {data.name}
        </h2>
        <p className={inter.className}>
          {data.symbol.toUpperCase()} -&gt; ${data.market_data.current_price.usd.toLocaleString()}
        </p>
        <p className={inter.className}>
          {moment(data.last_updated).format('MM/D/YY, h:mm a')}
        </p>
      </>
    )
  }
