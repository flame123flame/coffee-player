import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/component/components.module';
import { MatStepperModule } from '@angular/material/stepper';
import { Recommend001Component } from './recommend001/recommend001.component';
import { RecommendComponent } from './recommend/recommend.component';
import { Recommend002Component } from './recommend002/recommend002.component';
import { Recommend003Component } from './recommend003/recommend003.component';
import { Recommend004Component } from './recommend004/recommend004.component';
import { Recommend002detailComponent } from './recommend002detail/recommend002detail.component';


const routes: Routes = [
  
  { path: '', component: RecommendComponent ,children: [
  // { path: 'recommend-user', component: RecommendComponent },
  { path: 'recommend-user-tab1', component: Recommend001Component },
  { path: 'recommend-user-tab2', component: Recommend002Component },
 
  { path: 'recommend-user-tab3', component: Recommend003Component },
  { path: 'recommend-user-tab4', component: Recommend004Component },
  ]
},
{ path: 'recommend-user-tab2-detail', component: Recommend002detailComponent },
];


@NgModule({
  declarations: [Recommend001Component, RecommendComponent,Recommend002Component,Recommend003Component,Recommend004Component, Recommend002detailComponent],
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
export class  RecommendModule { }
