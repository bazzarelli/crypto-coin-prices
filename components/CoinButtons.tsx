import moment from "moment";
import Image from "next/image";
import { useState, useEffect } from "react";
import { CircleEllipsis } from "lucide-react";
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
  const [showTooltip, setShowTooltip] = useState(false);

  // Prevent button click when removing
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    import("../lib/coinListSlice").then(({ removeCoin }) => {
        dispatch(removeCoin(coinInfo.id));
    });
  };

  const toggleTooltip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowTooltip(!showTooltip);
  };

  useEffect(() => {
    if (!showTooltip) return;
    const closeTooltip = () => setShowTooltip(false);
    document.addEventListener("click", closeTooltip);
    return () => document.removeEventListener("click", closeTooltip);
  }, [showTooltip]);

  return (
    <div className={styles.buttonContainer}>
        <div className={styles.removeContainer}>
            <button
                onClick={toggleTooltip}
                className={styles.removeCoinButton}
                aria-label="Options"
            >
                <CircleEllipsis size={20} />
            </button>
            {showTooltip && (
                <div className={styles.tooltip} onClick={handleRemove}>
                    Remove coin
                </div>
            )}
        </div>
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
