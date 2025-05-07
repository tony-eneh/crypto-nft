import { Injectable } from "@angular/core";
import { Coin } from "../models";
import { TradingPair } from "../models/coin.model";
import { HttpClient } from '@angular/common/http';
import { of, shareReplay } from "rxjs";
import { TickerTimeSpans } from "../helpers";

const coins1: Coin[] = [
    {
        name: 'polygon',
        icon: 'assets/icons/bitcoin.svg', // image url
        price: 200.69,
        delta: 23.05,
        deltaPercentage: 11.34,
    }, {
        name: 'ethereum',
        icon: 'assets/icons/ethereum.svg', // image url
        price: 1539.46,
        delta: 5.95,
        deltaPercentage: 3.34,
    }, {
        name: 'uniswap',
        icon: 'assets/icons/bitcoin.svg', // image url
        price: 200.69,
        delta: 23.05,
        deltaPercentage: 11.34,
    }, {
        name: 'tron',
        icon: 'assets/icons/ethereum.svg', // image url
        price: 200.69,
        delta: 23.05,
        deltaPercentage: 11.34,
    },
];

const coins2: Coin[] = [
    {
        name: 'chainlink',
        icon: 'assets/icons/ethereum.svg', // image url
        price: 200.69,
        delta: 23.05,
        deltaPercentage: -11.34,
    }, {
        name: 'bitcoin',
        icon: 'assets/icons/bitcoin.svg', // image url
        price: 1539.46,
        delta: 5.95,
        deltaPercentage: 3.34,
    }, {
        name: 'cosmos',
        icon: 'assets/icons/ethereum.svg', // image url
        price: 200.69,
        delta: 23.05,
        deltaPercentage: -1.34,
    }, {
        name: 'litecoin',
        icon: 'assets/icons/litecoin.svg', // image url
        price: 200.69,
        delta: 23.05,
        deltaPercentage: 11.34,
    }, {
        name: 'xrp',
        icon: 'assets/icons/bitcoin.svg', // image url
        price: 200.69,
        delta: 23.05,
        deltaPercentage: -5.34,
    }
]

@Injectable({
    providedIn: 'root'
})
export class CryptosService {
    private baseUrl = 'https://try.readme.io/https://api-pub.bitfinex.com/v2'
    $candleSticks = {};

    constructor(private http: HttpClient) {
        TickerTimeSpans.forEach(
            ({ period }) => this.$candleSticks[period] = this.http
                .get(`${this.baseUrl}/candles/trade%3A${period}%3AtBTCUSD/hist?limit=30`)
                .pipe(shareReplay(1))
        )
        console.log("$candleSticks in service constructor: ", this.$candleSticks)
    }

    getCoins(group: 1 | 2 = 1) {
        return of(group == 1 ? coins1 : coins2);
    }

    getCryptoCandleSticks(period) {
        return this.$candleSticks[period];
    }
}