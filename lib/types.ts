export interface Coin {
    prices: Array<number[]>;
    market_caps: Array<number[]>;
    total_volumes: Array<number[]>;
}

export interface CoinSpotPrice {
    id: string;
    symbol: string;
    name: string;
    coin: string;
}