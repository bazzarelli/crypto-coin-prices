import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
// COMPONENTS
import CoinChartHeading from "../components/CoinChartHeading";
import CoinList from "../components/CoinList";
import CoinChart from "../components/CoinChart";
import HeadTag from "../components/HeadTag";
import CoinChartError from "../components/CoinChartError";
// STYLES
import styles from "../styles/CoinChartContainer.module.css";

export default function Home(): React.ReactElement {
  return (
    <>
      <HeadTag />
      <main className={styles.main}>
        <CoinChartHeading />

        <ErrorBoundary FallbackComponent={CoinChartError}>
          <div className={styles.container}>
            <CoinChart />
          </div>
        </ErrorBoundary>

        <Suspense
          fallback={
            <h3 className={styles.error}>Fetching crypto spot prices...</h3>
          }
        >
          <CoinList />
        </Suspense>
      </main>
    </>
  );
}
