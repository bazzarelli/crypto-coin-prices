import { configureStore } from '@reduxjs/toolkit'
import { selectedCoinSlice } from './selectedCoinSlice'
import { coinListSlice } from './coinListSlice'

const store = configureStore({
    reducer: {
        selectedCoin: selectedCoinSlice.reducer,
        coinList: coinListSlice.reducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export const currentCoin = (state: RootState) => state.selectedCoin;
export const coinList = (state: RootState) => state.coinList.coins;

// Inferred type: {selectedCoin: selectedCoinState}
export type AppDispatch = typeof store.dispatch

export default store;