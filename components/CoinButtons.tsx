import moment from "moment";
import Image from "next/image";
// state
import { useDispatch } from "react-redux";
import { updateCoin } from "../lib/selectedCoinSlice";
// styles
import styles from "../styles/CoinButton.module.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
type Coin = {
  [x: string]: string;
};

export default function CoinButtons(coin: { coin: Coin }): JSX.Element {
  const dispatch = useDispatch();
  const coinInfo = coin.coin;

  // Prevent button click when removing
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    import("../lib/coinListSlice").then(({ removeCoin }) => {
        dispatch(removeCoin(coinInfo.id));
    });
  };

  return (
    <div className={styles.buttonContainer}>
        <button
            onClick={handleRemove}
            className={styles.removeCoinButton}
            aria-label="Remove coin"
        >
            &times;
        </button>
        <button
        className={styles.button}
        onClick={() =>
            dispatch(
            updateCoin({
                coin: coinInfo.id,
                image: coinInfo.image,
            })
            )
        }
        >
        <p className={inter.className}>
            <Image
            src={coinInfo.image}
            alt={`${coinInfo.name} logo`}
            width={20}
            height={20}
            />
            <span>{coinInfo.name}</span>
        </p>
        <p className={inter.className}>
            {coinInfo.symbol.toUpperCase()} &rarr; $
            {coinInfo.current_price.toLocaleString()}
        </p>
        <p className={inter.className}>
            {moment(coinInfo.last_updated).format("MMMM D | h:mm a")}
        </p>
        </button>
    </div>
  );
}
