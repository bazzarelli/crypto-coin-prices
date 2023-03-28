import { Suspense } from 'react'
import { ErrorBoundary } from "react-error-boundary";
// COMPONENTS
import CoinChartHeading from '../components/CoinChartHeading'
import CoinButtons from '../components/CoinButtons'
import CoinChart from '../components/CoinChart'
import HeadTag from '../components/HeadTag'
import CoinChartError from '../components/CoinChartError'
// TYPES
import type { Coin } from '../lib/types'
// STYLES
import styles from '../styles/Home.module.css'

export default function Home(): React.ReactElement<Coin> {
  const myCoins = ['bitcoin', 'ethereum', 'cardano', 'aave', 'solana', 'polkadot', 'dogecoin', 'litecoin'];

  return (
    <>
      <HeadTag />
      <main className={styles.main}>
        <CoinChartHeading />

        <ErrorBoundary FallbackComponent={CoinChartError}>
          <CoinChart />
        </ErrorBoundary>


        <Suspense fallback={<h3 className={styles.error}>Fetching crypto spot prices...</h3>}>
          <div className={styles.grid}>
            {myCoins.map((coin) => (
              <div key={coin}>
                <CoinButtons coin={coin} />
              </div>
            ))}
          </div>
        </Suspense>

      </main>
    </>
  )
}
