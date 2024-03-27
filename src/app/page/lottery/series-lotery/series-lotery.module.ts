import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/component/components.module';
import { MatStepperModule } from '@angular/material/stepper';
import { SeriesLoteryComponent } from './series-lotery.component';
import { SeriesLotery001Component } from './series-lotery001/series-lotery001.component';
import { SeriesLotery002Component } from './series-lotery002/series-lotery002.component';
import { SeriesLotery003Component } from './series-lotery003/series-lotery003.component';
import { SeriesLotery004Component } from './series-lotery004/series-lotery004.component';
import { SeriesLotery005Component } from './series-lotery005/series-lotery005.component';



const routes: Routes = [
  {
    path: '', component: SeriesLoteryComponent, children: [
  
   
      {
        path: 'seriesLotery003', component: SeriesLotery003Component
      },
      {
        path: 'seriesLotery004', component: SeriesLotery004Component
      },
      {
        path: 'seriesLotery005', component: SeriesLotery005Component
      },
    
    
    ],
    
  },
  {
    path: 'seriesLotery001', component: SeriesLotery001Component
  },
  {
    path: 'seriesLotery002', component: SeriesLotery002Component
  },
];





@NgModule({
  declarations: [SeriesLoteryComponent,SeriesLotery001Component, SeriesLotery002Component, SeriesLotery003Component, SeriesLotery004Component, SeriesLotery005Component],
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
export class SeriesLotteryModule { }
