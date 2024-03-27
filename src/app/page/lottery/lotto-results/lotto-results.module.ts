import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CountdownModule } from 'ngx-countdown';
import { AlertModule } from 'ngx-bootstrap/alert';
import { LotteryResultsRoutingModule } from './lotto-results-routing.module';
import { LottoResults001Component } from './lotto-results001/lotto-results001.component';
import { LottoResultsComponent } from './lotto-results.component';
import { LottoResults002Component } from './lotto-results002/lotto-results002.component';
import { ComponentsModule } from 'src/app/component/components.module';


@NgModule({
  declarations: [LottoResultsComponent,LottoResults001Component, LottoResults002Component],
  imports: [
    AlertModule,
    FormsModule,
    CountdownModule,
    CommonModule,
    ComponentsModule,
    LotteryResultsRoutingModule
  ]
})
export class lottoResultsModule { }
