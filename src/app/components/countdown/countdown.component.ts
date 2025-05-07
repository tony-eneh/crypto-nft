import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnChanges, OnDestroy {
  @Input() time: string; // yyyy-mm-ddThh:mm:ss     //TODO support parsing year month and day too
  hh: string;
  mm: string;
  ss: string;
  startTime: number; // in seconds
  interval: any;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.parseTime(changes['time'].currentValue);
  }

  parseTime(timeString: string) {
    // TODO support displaying year, month and day

    // get start time in seconds
    this.startTime = Date.parse(timeString) / 1000;

    // set interval for periodic update of displayed time
    this.interval = setInterval(() => {
      const secondsDiff = (Date.now() - this.startTime);
      const days = Math.floor(secondsDiff / (24 * 60 * 60));
      const hours = Math.floor((secondsDiff - days * (24 * 60 * 60)) / (60 * 60));
      const minutes = Math.floor((secondsDiff - days * (24 * 60 * 60) - hours * 3600) / 60);
      const seconds = Math.floor(secondsDiff - days * (24 * 60 * 60) - hours * (60 * 60) - minutes * 60);

      // format for display
      this.hh = hours < 10 ? `0${hours}` : String(hours);
      this.mm = minutes < 10 ? `0${minutes}` : String(minutes);
      this.ss = seconds < 10 ? `0${seconds}` : String(seconds);
    }, 1000)
  }

  ngOnDestroy(): void {
    // clear interval
    clearInterval(this.interval)
  }
}
