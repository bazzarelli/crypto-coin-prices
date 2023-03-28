import styles from "../styles/CoinChartError.module.css"

export default function CoinChartError({ error }: { error: Error}) {
    return (
        <div className={styles.container}>
            <p className={styles.title}>Coin Chart Error...</p>
            <p className={styles.error}>{error.message}</p>
        </div>

    )
}