import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputModule } from './input/input.module';
import { CardModule } from './card/card.module';
import { NavbarModule } from './navbar/navbar.module';
import { StarModule } from './star/star.module';


@NgModule({
  declarations: [],
  imports: [
    StarModule,
    InputModule,
    CardModule,
    NavbarModule
  
  ],
  exports: [
    NavbarModule,
    InputModule,
    CardModule,
    StarModule
   
  ],
})
export class ComponentsModule { }
