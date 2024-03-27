import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/component/components.module';
import { MatStepperModule } from '@angular/material/stepper';
import { Promotion001Component } from './promotion001/promotion001.component';
import { MainPipeModule } from 'src/app/common/pipe/main-pipe.module';


const routes: Routes = [
  { path: '', component: Promotion001Component }, 
  { path: 'detail', component: Promotion001Component },
];


@NgModule({
  declarations: [Promotion001Component],
  imports: [
    MatStepperModule,
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    MainPipeModule
  ],
  exports: [RouterModule],
})
export class PromotionModule { }
