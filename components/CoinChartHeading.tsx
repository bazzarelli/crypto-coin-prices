import { useContext } from 'react'
import { Nothing_You_Could_Do } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { capitalize } from '@/lib/utils'
import { CoinContext } from '@/lib/context'

const nothing = Nothing_You_Could_Do({weight: '400', subsets: ['latin']});

export default function CoinChartHeading(): React.ReactElement {
  const { chartCoin } = useContext(CoinContext);

  return (
    <div className={styles.description}>
    <p className={nothing.className}>5 year price chart for {capitalize(chartCoin)}</p>
  </div>
)
}