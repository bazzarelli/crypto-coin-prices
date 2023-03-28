import { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface selectedCoinState {
    selectedCoin: string,
    selectedCoinImage: string
}
const initialState: selectedCoinState = {
    selectedCoin: 'bitcoin',
    selectedCoinImage: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579'
}

export const selectedCoinSlice = createSlice({
    name: 'selectedCoin',
    initialState,
    reducers: {
        updateCoin: (state, action: PayloadAction<{ coin: string, image: string }>) => {
            console.log('action.payload', action.payload);
            state.selectedCoin = action.payload.coin;
            state.selectedCoinImage = action.payload.image;
        }
    },
})
export const { updateCoin } = selectedCoinSlice.actions;
