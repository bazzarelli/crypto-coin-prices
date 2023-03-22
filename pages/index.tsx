// CORE
import Head from 'next/head'
// HOOKS
import { useCoinGeckoRangePrice } from '@/lib/useCoinGecko'

// STATE
import { currentCoin } from '@/lib/store'
import { useSelector } from 'react-redux'

// COMPONENTS
import CoinChartHeading from '@/components/CoinChartHeading'
import CoinButtons from '@/components/CoinButtons'
import CoinChart from '@/components/CoinChart'
// TYPES
import type { Coin } from '@/lib/types'
// STYLES
import styles from '@/styles/Home.module.css'

export default function Home(): React.ReactElement<Coin> {
  const myCoins = ['bitcoin', 'ethereum', 'cardano', 'aave'];
  const chartCoin = useSelector(currentCoin);
  const { data, isLoading, error } = useCoinGeckoRangePrice(chartCoin);
  const pricesData = data?.prices.map((day: Coin['prices'][]) => {
    return {
      price: day[1]
    }
  });

  return (
    <>
      <Head>
        <title>Coin prices</title>
        <meta name="description" content="data fetching demo with coin gecko api" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <CoinChartHeading />

        <CoinChart />

        <div className={styles.grid}>
          {myCoins.map((coin) => (
            <div key={coin}>
              <CoinButtons coin={coin} />
            </div>
          ))}
        </div>

      </main>
    </>
  )
}
