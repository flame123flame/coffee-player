import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/component/components.module';
import { MatStepperModule } from '@angular/material/stepper';
import { PoyLottery001Component } from './poy-lottery001/poy-lottery001.component';
import { PoyLottery002Component } from './poy-lottery002/poy-lottery002.component';
import { PoyLottery003Component } from './poy-lottery003/poy-lottery003.component';
import { PoyLottery004Component } from './poy-lottery004/poy-lottery004.component';
import { PoyLottery005Component } from './poy-lottery005/poy-lottery005.component';
import { PoyLotteryComponent } from './poy-lottery.component';
import { PoyLottery001detailComponent } from './poy-lottery001detail/poy-lottery001detail.component';
import { PoyLottery002detailComponent } from './poy-lottery002detail/poy-lottery002detail.component';
import { PoyLottery006Component } from './poy-lottery006/poy-lottery006.component';



const routes: Routes = [
  {
    path: '', component: PoyLotteryComponent, children: [
      {
        path: 'poyLottery001', component: PoyLottery001Component
      },
    
      {
        path: 'poyLottery002', component: PoyLottery002Component
      },
      {
        path: 'poyLottery003', component: PoyLottery003Component
      },
      {
        path: 'poyLottery004', component: PoyLottery004Component
      },
      {
        path: 'poyLottery005', component: PoyLottery005Component
      },
      {
        path: 'poyLottery006', component: PoyLottery006Component
      },
        {
        path: 'poyLottery001detail', component: PoyLottery001detailComponent
      },
      {
        path: 'poyLottery002detail', component: PoyLottery002detailComponent
      },
    
    ]
  },

];





@NgModule({
  declarations: [PoyLotteryComponent,PoyLottery001Component, PoyLottery002Component, PoyLottery003Component, PoyLottery004Component, PoyLottery005Component, PoyLottery001detailComponent, PoyLottery002detailComponent, PoyLottery006Component],
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
export class PoyLotteryModule { }
