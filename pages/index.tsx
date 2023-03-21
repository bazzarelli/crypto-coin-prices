import Head from 'next/head'
import Image from 'next/image'
import { useContext } from 'react'
import { useCoinGeckoRangePrice } from '@/lib/useCoinGecko'
import CoinChartHeading from '@/components/CoinChartHeading'
import CoinButtons from '@/components/CoinButtons'
import { CoinContext } from '@/lib/context'
import {
  daysAfterNewYears2018,
  tickLabelDaysAfterNewYears2018
} from '@/lib/utils'
import type { Coin } from '@/lib/types'
import styles from '@/styles/Home.module.css'
import {
  chartTooltipContentStyle,
  chartTooltipItemStyle
} from '@/styles/rechartStyles'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

export default function Home(): React.ReactElement<Coin> {
  const myCoins = ['bitcoin', 'ethereum', 'cardano', 'aave'];
  const { chartCoin } = useContext(CoinContext);
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

        <div className={styles.chart}>
          <div className={styles.chartImageCont}>
            {isLoading ?
              <div className={styles.circle}><div></div></div>
              : null}
            {!isLoading && data ?
              <Image src={`/${chartCoin}.svg`} alt={`${chartCoin} logo`} width={100} height={100} />
              : null}
          </div>
          {error ?
            <h3 className={styles.error}>Exceeded rate limit...</h3>
            :
            <ResponsiveContainer width="90%" height={300}>
              <AreaChart data={pricesData}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis style={{ fontFamily: 'Arial', fontSize: '0.5rem' }} stroke="#777ace" tickFormatter={(num) => tickLabelDaysAfterNewYears2018(parseInt(num))} />
                <YAxis style={{ fontFamily: 'Arial', fontSize: '0.8rem' }} label={{ fontFamily: 'Arial', value: 'USD', offset: 13, position: 'insideBottomLeft', fill: '#777ace' }} stroke="#EEEEEE" tickFormatter={(num) => `$${num.toLocaleString('en-US', { maximumFractionDigits: 2 })}`  } />
                <Tooltip labelFormatter={(value) => daysAfterNewYears2018(parseInt(value))} contentStyle={chartTooltipContentStyle} itemStyle={chartTooltipItemStyle} separator=': ' formatter={(value, name) => [`$${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`, name]} />
                <Area type="monotone" dataKey="price" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
              </AreaChart>
            </ResponsiveContainer>
          }

        </div>

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
