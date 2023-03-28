export interface Coin {
    prices: Array<number[]>;
    market_caps: Array<number[]>;
    total_volumes: Array<number[]>;
}

export interface CoinSpotPrice {
    id: string;
    symbol: string;
    image: {
        small: string;
        large: string;
    };
    name: string;
    coin: string;
    last_updated: string;
    market_data: {
        current_price: {
            usd: number;
        };
    };
}