import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCoin } from "../lib/coinListSlice";
import { searchCoin } from "../hooks/useCoinGecko";
import styles from "../styles/CoinButton.module.css";
import { Inter } from "next/font/google";
import { coinList } from "../lib/store";

const inter = Inter({ subsets: ["latin"] });

export default function AddCoinButton(): JSX.Element {
  const dispatch = useDispatch();
  const currentCoins = useSelector(coinList);
  const [isEditing, setIsEditing] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!query.trim()) return;

    if (currentCoins.length >= 20) {
        setError("Max 20 coins allowed");
        return;
    }

    setLoading(true);
    setError("");

    try {
      const results = await searchCoin(query);
      if (results && results.length > 0) {
        // Find exact match or take the first one
        const exactMatch = results.find((c: any) => c.symbol.toLowerCase() === query.toLowerCase() || c.name.toLowerCase() === query.toLowerCase());
        const coinToAdd = exactMatch || results[0];

        if (currentCoins.includes(coinToAdd.id)) {
            setError("Coin already in list");
        } else {
            dispatch(addCoin(coinToAdd.id));
            setIsEditing(false);
            setQuery("");
        }
      } else {
        setError("Coin not found");
      }
    } catch (err) {
      setError("Error searching coin");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
        handleAdd();
    } else if (e.key === 'Escape') {
        setIsEditing(false);
        setQuery("");
        setError("");
    }
  };

  if (isEditing) {
    return (
      <div className={styles.button} style={{ cursor: 'default' }}>
        <div className={inter.className} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <input
                autoFocus
                type="text"
                placeholder="Enter coin name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className={styles.inputText}
            />
            {error && <span style={{ color: 'red', fontSize: '0.8rem' }}>{error}</span>}
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button
                    onClick={() => setIsEditing(false)}
                    style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '0.8rem' }}
                >
                    Cancel
                </button>
                <button
                    onClick={handleAdd}
                    disabled={loading}
                    className={styles.addCoinButton}
                >
                    {loading ? "..." : "Add"}
                </button>
            </div>
        </div>
      </div>
    );
  }

  return (
    <button
      className={styles.button}
      onClick={() => setIsEditing(true)}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div className={inter.className} style={{ textAlign: 'center' }}>
        <span style={{ fontSize: '2rem', display: 'block' }}>+</span>
        <span>Add a coin</span>
      </div>
    </button>
  );
}
