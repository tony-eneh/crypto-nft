export type Coin = {
    name: string,
    icon: string, // image url
    price: number,
    delta: number,
    deltaPercentage: number,
}

export type TradingPair = 'BTCUSD' | 'ETHUSD' | 'LTCUSD';

export type GraphViewPeriod = '15m' | '1h' | '1d' | '1w' | '1m' | '1y';