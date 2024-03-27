import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Register001Component } from './register001/register001.component';
import { ComponentsModule } from 'src/app/component/components.module';
import {MatStepperModule} from '@angular/material/stepper';

const routes: Routes = [
  { path: 'user-register', component: Register001Component },
];

@NgModule({
  declarations: [

    Register001Component
  ],
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
export class RegisterModule { }
