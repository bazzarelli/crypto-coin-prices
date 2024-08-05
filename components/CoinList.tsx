import styles from "../styles/Home.module.css";
import CoinButtons from "./CoinButtons";

export default function CoinList(): React.ReactElement {
  const myCoins = [
    "bitcoin",
    "ethereum",
    "cardano",
    "aave",
    "solana",
    "polkadot",
    "dogecoin",
    "litecoin",
  ];

  return (
    <div className={styles.list}>
      <div className={styles.grid}>
        {myCoins.map((coin) => (
          <div key={coin}>
            <CoinButtons coin={coin} />
          </div>
        ))}
      </div>
    </div>
  );
}
