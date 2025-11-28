import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CoinListState {
  coins: string[];
}

const defaultCoins = [
  "bitcoin",
  "ethereum",
  "tether",
  "xrp",
  "bnb",
  "solana",
  "usdc",
  "tron",
  "lido-staked-ether",
  "dogecoin"
];

const getInitialCoins = (): string[] => {
  if (typeof window !== 'undefined') {
    const savedCoins = localStorage.getItem('crypto-coins-list');
    if (savedCoins) {
      return JSON.parse(savedCoins);
    }
  }
  return defaultCoins;
};

const initialState: CoinListState = {
  coins: getInitialCoins(),
};

export const coinListSlice = createSlice({
  name: 'coinList',
  initialState,
  reducers: {
    addCoin: (state, action: PayloadAction<string>) => {
      if (!state.coins.includes(action.payload) && state.coins.length < 20) {
        state.coins.unshift(action.payload);
        if (typeof window !== 'undefined') {
            localStorage.setItem('crypto-coins-list', JSON.stringify(state.coins));
        }
      }
    },
    removeCoin: (state, action: PayloadAction<string>) => {
      state.coins = state.coins.filter(coin => coin !== action.payload);
      if (typeof window !== 'undefined') {
        localStorage.setItem('crypto-coins-list', JSON.stringify(state.coins));
      }
    },
    setCoins: (state, action: PayloadAction<string[]>) => {
        state.coins = action.payload;
        if (typeof window !== 'undefined') {
            localStorage.setItem('crypto-coins-list', JSON.stringify(state.coins));
        }
    }
  },
});

export const { addCoin, removeCoin, setCoins } = coinListSlice.actions;

export default coinListSlice.reducer;
