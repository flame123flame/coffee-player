import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/component/components.module';
import { MatStepperModule } from '@angular/material/stepper';




const routes: Routes = [
  {
    path: 'game-lotto',
    loadChildren: () => import('../../page/lottery/game-lottery/game-lottery.module').then(m => m.GameLotteryModule)
  },

  {
    path: 'poy-lotto',
    loadChildren: () => import('../../page/lottery/poy-lottery/poy-lottery.module').then(m => m.PoyLotteryModule)
  },

  {
    path: 'series-lotery',
    loadChildren: () => import('../../page/lottery/series-lotery/series-lotery.module').then(m => m.SeriesLotteryModule)
  },
  {
    path: 'series-lotery',
    loadChildren: () => import('../../page/lottery/series-lotery/series-lotery.module').then(m => m.SeriesLotteryModule)
  },
  {
    path: 'results',
    loadChildren: () => import('../../page/lottery/lotto-results/lotto-results.module').then(m => m.lottoResultsModule)
  },
];


@NgModule({
  declarations: [],
  imports: [
    MatStepperModule,
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [RouterModule],
})
export class LotteryModule { }
