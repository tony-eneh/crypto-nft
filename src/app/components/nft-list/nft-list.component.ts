import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CryptosService } from '../../services/cryptos.service';
import { NFTsService } from '../../services/nfts.service';
import { Coin, NFT } from '../../models';

@Component({
  selector: 'app-nft-list',
  templateUrl: './nft-list.component.html',
  styleUrls: ['./nft-list.component.scss']
})
export class NftListComponent {
  title = 'crypto-nft';
  walletBalance = 1234.56;
  coins1: Coin[];
  coins2: Coin[];
  nfts: NFT[];
  singleNFTView = false;
  faPlus = faPlus
  activeCryptoID: string;
  activeCrypto: Coin;
  cryptoView = false;
  loadingNFTs = false;

  constructor(
    private router: Router,
    private nftsService: NFTsService,
    private cryptosService: CryptosService,
  ) { }

  ngOnInit() {
    this.getCryptos(1);
    this.getCryptos(2);
    this.getNFTs()
  }

  getCryptos(group: 1 | 2) {
    this.cryptosService.getCoins(group).subscribe(
      coins => this[`coins${group}`] = coins
    )
  }

  getNFTs() {
    this.loadingNFTs = true;
    this.nftsService.getNFTs().subscribe(
      nfts => this.nfts = nfts
    ).add(() => this.loadingNFTs = false)
  }

  onClickCrypto(uniqueID: string, crypto: Coin): void {
    this.activeCryptoID = uniqueID;
    this.activeCrypto = crypto;
    this.cryptoView = true;
  }
}
