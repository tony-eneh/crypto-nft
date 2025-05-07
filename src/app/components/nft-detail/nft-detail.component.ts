import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { faArrowRight, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { NFT } from 'src/app/models';
// import SwipeListener from 'swipe-listener';

@Component({
  selector: 'app-nft-detail',
  templateUrl: './nft-detail.component.html',
  styleUrls: ['./nft-detail.component.scss']
})
export class NftDetailComponent implements OnInit {
  @Input() nft: NFT;
  @ViewChild('image') image: ElementRef;
  singleViewMode = false;
  faUserPlus = faUserPlus;
  faArrowRight = faArrowRight;
  swipeListener: any;

  constructor(private thisElement: ElementRef) { }

  ngOnInit(): void {
    // this.swipeListener = SwipeListener
  }

  onImageClick() {
    if (!this.singleViewMode) {
      // occupy full height
      const distanceToTopOfScreen = this.image.nativeElement.getBoundingClientRect().top;
      console.log("window.scrollY: ", window.scrollY, ", distanceToTopOfScreen: ", distanceToTopOfScreen)
      const sign = window.scrollY < distanceToTopOfScreen ? '' : '-';
      this.thisElement.nativeElement.style.setProperty('--to-top', `${-distanceToTopOfScreen}px`);

      // disable scroll
      window.document.documentElement.style.setProperty('overflow', 'hidden');

      this.singleViewMode = true;
    }
  }

  onCloseSingleView() {
    this.singleViewMode = false

    // re-enable page scroll
    window.document.documentElement.style.removeProperty('overflow');
  }

  ngOnDestroy() {
    this.swipeListener.off()
  }
}
