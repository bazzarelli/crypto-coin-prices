import axios from "axios"

const spotPriceApi = axios.create({
    baseURL: "https://api.coingecko.com/api/v3/coins/"
})

export const spotPriceUrlEndpoint = '/price'

export const getSpotPriceByCoinId = async (coin) => {
    const response = await spotPriceApi.get(coin)
    return response.data
}

