import Head from 'next/head'
import React, { useState, useEffect, useContext } from 'react'
import { Inter } from 'next/font/google'
import { CoinContext } from '@/lib/context'
import styles from '@/styles/Home.module.css'
import FetchCoinData from '@/components/FetchCoinData'
import { capitalize } from '@/lib/utils'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis
} from 'recharts';

const inter = Inter({ subsets: ['latin'] });

interface Coin {
  prices: Array<number[]>;
  market_caps: Array<number[]>;
  total_volumes: Array<number[]>;
}

export default function Home(): React.ReactElement<Coin> {
  const {chartCoin, setChartCoin} = useContext(CoinContext);
  const [data, setData] = useState<Coin[]>([]);
  const myCoins = ['bitcoin', 'ethereum', 'cardano', 'aave'];

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${chartCoin}/market_chart/range?vs_currency=usd&from=1514793600&to=1678254666`)
      .then(response => response.json())
      .then(data => setData(data['prices'].map((day: any[]) => {
        return {
          price: day[1]
        }
      })))
      .catch(error => console.error(error));
  }, [chartCoin]);

  return (
    <>
      <Head>
        <title>Coin prices</title>
        <meta name="description" content="simple test of swr data fetching" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>

        <div className={styles.description}>
          <p>5-year price chart for {capitalize(chartCoin)}</p>
        </div>

        <div className={styles.center}>
          <AreaChart width={768} height={256} data={data}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            {/* change the labels to be years */}
            <XAxis ticks={[2019,2020,2021,2022,2023]} />
            <YAxis />
            <Area type="monotone" dataKey="price" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
          </AreaChart>
        </div>

        <div className={styles.grid}>
          {myCoins.map((coin) => (
            <div key={coin}>
              <FetchCoinData coin={coin} />
            </div>
          ))}
        </div>

      </main>
    </>
  )
}
