import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { NFT } from "../models";

const nfts: NFT[] = [
    {
        name: 'infinity',
        image: 'assets/images/nft-1.webp',
        number: 1,
        price: 1.24,
        dateCreated: '2023-01-05T00:12:55',
        creator: '@realy'
    }, {
        name: 'styllo',
        image: 'assets/images/nft-2.webp',
        number: 34,
        price: 21.24,
        dateCreated: '2023-01-25T11:16:31',
        creator: '@abattoir'
    }, {
        name: 'yonkori',
        image: 'assets/images/nft-3.png',
        number: 15,
        price: 10.07,
        dateCreated: '2023-02-03T20:15:05',
        creator: '@grealish'
    }, {
        name: 'awanta',
        image: 'assets/images/nft-4.jpeg',
        number: 15,
        price: 10.07,
        dateCreated: '2023-01-30T20:15:05',
        creator: '@grealish'
    },
]

@Injectable({
    providedIn: 'root'
})
export class NFTsService {
    constructor(private http: HttpClient) { }

    getNFTs() {
        return of(nfts)
    }
}