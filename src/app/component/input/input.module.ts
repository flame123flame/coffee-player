import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { InputTextComponent } from './input-text/input-text.component';
import { InputSelectComponent } from './input-select/input-select.component';
import { InputTextareaComponent } from './input-textarea/input-textarea.component';

import { InputCalendarComponent } from './input-calendar/input-calendar.component';
import { InputPasswordComponent } from './input-password/input-password.component';
@NgModule({

  imports: [
    CommonModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [

    InputTextComponent,
    InputSelectComponent,
    InputTextareaComponent,
    InputCalendarComponent,
    InputPasswordComponent

  ],
  exports: [
    InputPasswordComponent,
    InputTextComponent,
    InputTextareaComponent,
    InputSelectComponent,
    InputCalendarComponent
  ],

})
export class InputModule { }
