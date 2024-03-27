import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { MainComponent } from 'src/app/page/main/main.component';
import { DepositMoneyComponent } from 'src/app/page/deposit-money/deposit-money.component'
import { PromotionModule } from 'src/app/page/promotion/promotion.module'
import { ProfileBankModule } from 'src/app/page/profile-bank/profile-bank.module';
const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', component: MainComponent },
      { path: 'main', component: MainComponent },
      { path: 'deposit', component: DepositMoneyComponent },
      {
        path: 'promotion',
        loadChildren: () => import('../../page/promotion/promotion.module').then(m => m.PromotionModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../../page/profile-bank/profile-bank.module').then(m => m.ProfileBankModule)
      },
      {
        path: 'user',
        loadChildren: () => import('../../page/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'games',
        loadChildren: () => import('../../page/games/games.module').then(m => m.GamesModule)
      },
      {
        path: 'recommend',
        loadChildren: () => import('../../page/recommend/recommend.module').then(m => m.RecommendModule)
      },
      {
        path: 'lottery',
        loadChildren: () => import('../../page/lottery/lottery.module').then(m => m.LotteryModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
