import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/component/components.module';
import { MatStepperModule } from '@angular/material/stepper';

import { ProfileBank001Component } from './profile-bank001/profile-bank001.component';
import { ProfileBank002Component } from './profile-bank002/profile-bank002.component';
import { MatBadgeModule } from '@angular/material/badge';
import { ProfileBank003Component } from './profile-bank003/profile-bank003.component';


const routes: Routes = [
  { path: '', component: ProfileBank001Component },
  { path: 'profile-bank001', component: ProfileBank001Component },
  { path: 'profile-bank002', component: ProfileBank002Component },
  { path: 'profile-bank003', component: ProfileBank003Component },
];


@NgModule({
  declarations: [ProfileBank001Component, ProfileBank002Component, ProfileBank003Component],
  imports: [
    MatStepperModule,
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    MatBadgeModule
  ],
  exports: [RouterModule],
})
export class ProfileBankModule { }
