import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import FetchCoinData from '@/components/FetchCoinData'
import FetchCoinPriceHistory from '@/components/FetchCoinPriceHistory'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [chartCoin, setChartCoin] = useState('bitcoin')
  console.log('chartCoin', chartCoin)

  const bitcoinFiveYearData: any = FetchCoinPriceHistory(chartCoin);
  console.table(bitcoinFiveYearData.prices);

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
          <p>
            Choose your coin and see the 5 year chart
          </p>
        </div>

        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <div className={styles.thirteen}>
            <Image
              src="/thirteen.svg"
              alt="13"
              width={40}
              height={31}
              priority
            />
          </div>
        </div>

        <div className={styles.grid}>
          <button onClick={() => setChartCoin('bitcoin')} className={styles.card}>
            <FetchCoinData coin='bitcoin' />
          </button>

          <button onClick={() => setChartCoin('ethereum')} className={styles.card}>
            <FetchCoinData coin='ethereum' />
          </button>

          <button onClick={() => setChartCoin('ethereum')} className={styles.card}>
            <FetchCoinData coin='cardano' />
          </button>

          <button onClick={() => setChartCoin('aave')} className={styles.card}>
            <FetchCoinData coin='aave' />
          </button>
        </div>
      </main>
    </>
  )
}
