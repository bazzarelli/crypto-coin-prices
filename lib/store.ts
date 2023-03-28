import { configureStore } from '@reduxjs/toolkit'
import { selectedCoinSlice } from './selectedCoinSlice'

const store = configureStore({
    reducer: {
        selectedCoin: selectedCoinSlice.reducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export const currentCoin = (state: RootState) => state.selectedCoin;

// Inferred type: {selectedCoin: selectedCoinState}
export type AppDispatch = typeof store.dispatch

export default store;