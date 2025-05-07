import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CryptoDetailComponent } from './components/crypto-detail/crypto-detail.component';
import { NftListComponent } from './components/nft-list/nft-list.component';

const routes: Routes = [
  { path: 'cryptos/:id', component: CryptoDetailComponent },
  { path: '', component: NftListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
