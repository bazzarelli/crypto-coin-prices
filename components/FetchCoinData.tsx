import axios from 'axios'
import useSWR from 'swr'
import moment from 'moment'
import Image from 'next/image'
import styles from '@/styles/CoinButton.module.css'
import { CoinContext } from '@/lib/context'
import { Inter } from 'next/font/google'
import { useContext } from 'react'

const inter = Inter({ subsets: ['latin'] })
const fetcher = async (url: string) => await axios.get(url).then((res) => res.data);

export default function FetchCoinData(coin: { [x: string]: any }): JSX.Element {
  const { setChartCoin } = useContext(CoinContext);
  const address = `https://api.coingecko.com/api/v3/coins/${coin['coin']}`;
  const { data, error } = useSWR(address, fetcher);

  if (error) return <div>error loading data</div>;
  if (!data) return <div>loading...</div>;

  return (
    <button className={styles.button} onClick={() => setChartCoin(data.name.toLowerCase())}>
      <p className={inter.className}>
        <Image src={`/${data.name}.svg`} alt="Bitcoin logo" width={20} height={20} />
        <span>{data.name}</span>
      </p>
      <p className={inter.className}>
        {data.symbol.toUpperCase()} -&gt; ${data.market_data.current_price.usd.toLocaleString()}
      </p>
      <p className={inter.className}>
        {moment(data.last_updated).format('MMMM D | h:mm a')}
      </p>
    </button>
  )
}
