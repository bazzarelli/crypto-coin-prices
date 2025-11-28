import styles from "../styles/Home.module.css";
import CoinButtons from "./CoinButtons";
import AddCoinButton from "./AddCoinButton";
// hooks
import { useCoinGeckoListMarket } from "../hooks/useCoinGecko";
// state
import { useSelector } from "react-redux";
import { coinList } from "../lib/store";

export default function CoinList(): React.ReactElement {
  const coins = useSelector(coinList);
  const { data } = useCoinGeckoListMarket(coins);

  return (
    <div className={styles.list}>
      <div className={styles.grid}>
        <AddCoinButton />
        {data && data.map((coin: any) => (
          <CoinButtons key={coin.id} coin={coin} />
        ))}
      </div>
    </div>
  );
}
