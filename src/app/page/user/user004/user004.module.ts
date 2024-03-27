import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/component/components.module';
import { MatStepperModule } from '@angular/material/stepper';

import { User004Sub001Component } from './user004-sub001/user004-sub001.component';
import { User004Sub002Component } from './user004-sub002/user004-sub002.component';
import { User004Component } from './user004.component';



const routes: Routes = [
  {
    path: '', component: User004Component, children: [
      {
        path: 'user004-sub001', component: User004Sub001Component
      },
      {
        path: 'user004-sub002', component: User004Sub002Component
      },
    
    ]
  },


];





@NgModule({
  declarations: [User004Component,User004Sub001Component, User004Sub002Component],
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
export class User004Module { }
