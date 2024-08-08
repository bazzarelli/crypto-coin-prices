import styles from "../styles/Home.module.css";
import CoinButtons from "./CoinButtons";
// hooks
import { useCoinGeckoListMarket } from "../hooks/useCoinGecko";

export default function CoinList(): React.ReactElement {
  const coins = [
    "bitcoin",
    "ethereum",
    "cardano",
    "aave",
    "solana",
    "polkadot",
    "dogecoin",
    "litecoin",
    "usd-coin",
    "steth",
    "trx",
    "pepe",
    "zcash",
    "stellar",
    "eos",
    "binancecoin",
    "ripple",
    "tether",
    "vechain",
    "iota",
    "xrp",
    "dash",
    "zilliqa",
  ];
  const { data } = useCoinGeckoListMarket(coins);
  // console.log("data~~~>", data);

  return (
    <div className={styles.list}>
      <div className={styles.grid}>
        {data.map((coin: any) => (
          <CoinButtons key={coin.id} coin={coin} />
        ))}
      </div>
    </div>
  );
}
