import moment from 'moment'
import Image from 'next/image'
import styles from '@/styles/CoinButton.module.css'
import { CoinContext } from '@/lib/context'
import { Inter } from 'next/font/google'
import { useContext } from 'react'
import type { CoinSpotPrice } from '@/lib/types'
import { useCoinGeckoSpotPrice } from '@/lib/useCoinGecko'

const inter = Inter({ subsets: ['latin'] })

export default function CoinButtons(coin: { [x: string]: string }): JSX.Element {
  const { setChartCoin } = useContext(CoinContext);
  const {data, isLoading, error} = useCoinGeckoSpotPrice(coin['coin']);

  if (error) return <p className={inter.className}>Exceeded rate limit...</p>;
  if (isLoading) return <p className={inter.className}>loading...</p>;

  return (
    <button className={styles.button} onClick={() => setChartCoin(data.id)}>
      <p className={inter.className}>
        <Image src={`/${data.id}.svg`} alt={`${data.name} logo`} width={20} height={20} />
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
