import Head from 'next/head'
import Image from 'next/image'
import moment from 'moment'
import { useState, useEffect, useContext } from 'react'
import { Inter, Nothing_You_Could_Do } from 'next/font/google'
import { CoinContext } from '@/lib/context'
import styles from '@/styles/Home.module.css'
import FetchCoinData from '@/components/FetchCoinData'
import { capitalize } from '@/lib/utils'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';


const nothing = Nothing_You_Could_Do({weight: '400', preload: false});
const inter = Inter({ subsets: ['latin'] });

const chartTooltipContentStyle = {
  fontFamily: 'Arial',
  backgroundColor: '#000a2a',
  color: '#777ace',
  fontSize: '11px',
  padding: '10px',
  border: '1px solid #777ace',
}
const chartTooltipItemStyle = {
  color: '#999',
  fontSize: '13px',
  backgroundColor: '#1a0b5e',
  padding: '7px',
}

interface Coin {
  prices: Array<number[]>;
  market_caps: Array<number[]>;
  total_volumes: Array<number[]>;
}

export default function Home(): React.ReactElement<Coin> {
  const { chartCoin } = useContext(CoinContext);
  const [data, setData] = useState<Coin[]>([]);
  const myCoins = ['bitcoin', 'ethereum', 'cardano', 'aave'];
  const newYears2018 = 1514793600;
  const today = Math.floor(Date.now() / 1000);
  const daysAfterNewYears2018 = (date: number) => {
    return moment('2018-01-01').add(date, 'days').format('ll');
  };

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${chartCoin}/market_chart/range?vs_currency=usd&from=${newYears2018}&to=${today}}`)
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
        <meta name="description" content="data fetching demo with coin gecko api" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>

        <div className={styles.description}>
          <p className={nothing.className}>5 year price chart for {capitalize(chartCoin)}</p>
        </div>

        <div className={styles.chart}>
          <Image src={`/${chartCoin}.svg`} alt={`${chartCoin} logo`} width={100} height={100} />
          <ResponsiveContainer width="90%" height={300}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              {/* TODO: get correct xaxis date labels and ticks to display */}
              <XAxis stroke="#999999" ticks={[2019, 2020, 2021, 2022, 2023]} />
              <YAxis style={{fontFamily:'Arial', fontSize: '0.8rem'}} label={{ value: 'USD', offset: 13, position: 'insideBottomLeft', fill: '#777ace' }} stroke="#EEEEEE" />
              <Tooltip labelFormatter={(value) => daysAfterNewYears2018(parseInt(value))} contentStyle={chartTooltipContentStyle} itemStyle={chartTooltipItemStyle} separator=': ' formatter={(value, name) => [`$${value.toLocaleString('en-US', {maximumFractionDigits:2})}`, name]} />
              <Area type="monotone" dataKey="price" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
          </ResponsiveContainer>
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
