import { configureStore, createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'

// selectedCoinSlice
interface selectedCoinState {
    selectedCoin: string
}
const initialState: selectedCoinState = {
    selectedCoin: 'bitcoin'
}
export const selectedCoinSlice = createSlice({
    name: 'selectedCoin',
    initialState,
    reducers: {
        updateCoin: (state, action: PayloadAction<string>) => {
            state.selectedCoin = action.payload
        }
    },
})
export const { updateCoin } = selectedCoinSlice.actions;
// selectedCoinSlice

const store = configureStore({
    reducer: {
        selectedCoin: selectedCoinSlice.reducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export const currentCoin = (state: RootState) => state.selectedCoin.selectedCoin;

// Inferred type: {selectedCoin: selectedCoinState}
export type AppDispatch = typeof store.dispatch

export default store;