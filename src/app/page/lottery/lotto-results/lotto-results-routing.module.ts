import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LottoResultsComponent } from './lotto-results.component';
import { LottoResults001Component } from './lotto-results001/lotto-results001.component';
import { LottoResults002Component } from './lotto-results002/lotto-results002.component';

const routes: Routes = [
  {
    path: '', component: LottoResultsComponent, children: [
      {
        path: 'lotto-results01', component: LottoResults001Component
      },
      {
        path: 'lotto-results02', component: LottoResults002Component
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LotteryResultsRoutingModule { }
