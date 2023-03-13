import { CoinContext } from '@/lib/context'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [chartCoin, setChartCoin] = useState('bitcoin');

  return (
    <CoinContext.Provider value={{chartCoin, setChartCoin}}>
      <Component {...pageProps} />
    </CoinContext.Provider>
  )
}
