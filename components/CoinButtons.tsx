import moment from 'moment'
import Image from 'next/image'
// state
import { useDispatch } from 'react-redux'
import { updateCoin } from '../lib/selectedCoinSlice'
// styles
import styles from '../styles/CoinButton.module.css'
import { Inter } from 'next/font/google'
// hooks
import { useCoinGeckoSpotPrice } from '../hooks/useCoinGecko'

const inter = Inter({ subsets: ['latin'] })

export default function CoinButtons(coin: { [x: string]: string }): JSX.Element {
  const dispatch = useDispatch();
  const {data} = useCoinGeckoSpotPrice(coin['coin']);

  return (
    <button className={styles.button} onClick={() => dispatch(updateCoin({
        coin: data.id,
        image: data.image.large,
      }))}>
      <p className={inter.className}>
        <Image src={data.image.small} alt={`${data.name} logo`} width={20} height={20} />
        <span>{data.name}</span>
      </p>
      <p className={inter.className}>
        {data.symbol.toUpperCase()} &rarr; ${data.market_data.current_price.usd.toLocaleString()}
      </p>
      <p className={inter.className}>
        {moment(data.last_updated).format('MMMM D | h:mm a')}
      </p>
    </button>
  )
}
