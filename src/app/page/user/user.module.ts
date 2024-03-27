import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User001Component } from './user001/user001.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/component/components.module';
import { Routes, RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { User002Component } from './user002/user002.component';
import { User003Component } from './user003/user003.component';
import { User003DetailComponent } from './user003-detail/user003-detail.component';
import { User004Component } from './user004/user004.component';
import { User005Component } from './user005/user005.component';
const routes: Routes = [
  { path: '', component: User001Component },
  { path: 'user-setting', component: User001Component },
  { path: 'user002', component: User002Component },
  { path: 'user003', component: User003Component },
  { path: 'user003-detail', component: User003DetailComponent },
  { path: 'user005', component: User005Component },
  {
    path: 'user004',
    loadChildren: () => import('../../page/user/user004/user004.module').then(m => m.User004Module)
  },
];


@NgModule({
  declarations: [User001Component, User002Component, User003Component, User003DetailComponent, User005Component],
  imports: [
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(routes),
    BsDatepickerModule.forRoot(),
  ],

})
export class UserModule { }
