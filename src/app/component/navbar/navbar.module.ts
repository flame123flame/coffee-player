import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { NavbarComponent } from './navbar/navbar.component';
@NgModule({

  imports: [
    CommonModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [

    NavbarComponent,
   

  ],
  exports: [
    NavbarComponent,
   
  ],

})
export class NavbarModule { }
