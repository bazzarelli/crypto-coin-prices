import { Nothing_You_Could_Do } from 'next/font/google'
import styles from '../styles/Home.module.css'
import { capitalize } from '../lib/utils'
// state: current coin
import { currentCoin } from '../lib/store'
import { useSelector } from 'react-redux'

const nothing = Nothing_You_Could_Do({ weight: '400', subsets: ['latin'] });

export default function CoinChartHeading(): React.ReactElement {
  const chartCoin = useSelector(currentCoin);

  return (
    <div className={styles.description}>
      <p data-testid="heading" className={nothing.className}>5 year price chart for {capitalize(chartCoin.selectedCoin)}</p>
    </div>
  )
}