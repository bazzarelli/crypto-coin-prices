// COMPONENTS
import CoinChartHeading from '../components/CoinChartHeading'
import CoinButtons from '../components/CoinButtons'
import CoinChart from '../components/CoinChart'
import HeadTag from '../components/HeadTag'
// TYPES
import type { Coin } from '../lib/types'
// STYLES
import styles from '../styles/Home.module.css'

export default function Home(): React.ReactElement<Coin> {
  const myCoins = ['bitcoin', 'ethereum', 'cardano', 'aave'];

  return (
    <>
      <HeadTag />
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
