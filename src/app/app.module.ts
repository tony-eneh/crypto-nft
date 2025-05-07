import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NftListComponent } from './components/nft-list/nft-list.component';
import { NftDetailComponent } from './components/nft-detail/nft-detail.component';
import { CryptoDetailComponent } from './components/crypto-detail/crypto-detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CountdownComponent } from './components/countdown/countdown.component';
import { ChartComponent } from './components/chart/chart.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NftListComponent,
    NftDetailComponent,
    CryptoDetailComponent,
    CountdownComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
