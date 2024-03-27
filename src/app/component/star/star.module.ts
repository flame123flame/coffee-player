import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { StarComponent } from './star/star.component';

@NgModule({

  imports: [
    CommonModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [

    StarComponent,
   

  ],
  exports: [
    StarComponent,
   
  ],

})
export class StarModule { }
