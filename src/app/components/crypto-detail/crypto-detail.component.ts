import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Coin } from 'src/app/models';
import { faBitcoinSign } from '@fortawesome/free-solid-svg-icons';
import { forkJoin } from 'rxjs';
import { CryptosService } from 'src/app/services/cryptos.service';
import { CandlestickChart, TickerTimeSpans } from 'src/app/helpers';
import { GraphViewPeriod } from 'src/app/models/coin.model';

@Component({
  selector: 'app-crypto-detail',
  templateUrl: './crypto-detail.component.html',
  styleUrls: ['./crypto-detail.component.scss']
})
export class CryptoDetailComponent implements OnInit {
  @Input() coin: Coin;
  @Input() show: boolean;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('svg') svg: ElementRef;
  activePeriod: GraphViewPeriod = '15m';
  periods = TickerTimeSpans;
  faBitcoinSign = faBitcoinSign;

  constructor(private cryptoService: CryptosService) { }

  ngOnInit(): void {
    this.setupGraph();
  }

  ngOnChanges(change: SimpleChanges) {
    this.coin = change['coin']?.currentValue || {};
  }

  onClickBackBtn() {
    this.close.emit(true);
  }

  onSelectPeriod(period) {
    this.activePeriod = period;

    // TODO change graph to reflect chosen period
    this.updateGraph(this.activePeriod);
  }

  setupGraph() {
    this.updateGraph(this.activePeriod);
  }

  updateGraph(period: GraphViewPeriod) {
    console.log("updateGraph called with period: ", period)
    this.cryptoService.getCryptoCandleSticks(period).subscribe(
      res => {
        console.log("response from fetching data: ", res)

        CandlestickChart(res, {
          date: d => new Date(d[0]),
          high: d => d[3],
          low: d => d[4],
          open: d => d[1],
          close: d => d[2],
          yLabel: "↑ Price ($)"
        })
      }
    )
  }

  getChartData() {
    // TODO fetch multiple 
    forkJoin([
      // this.
    ])
  }
}
