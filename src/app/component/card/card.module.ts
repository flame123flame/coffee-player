import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { CardImageComponent } from './card-image/card-image.component';
import { RouterModule } from '@angular/router';
import { CardListComponent } from './card-list/card-list.component';
import { CardRegisterComponent } from './card-register/card-register.component';
import { CardProfileBankComponent } from './card-profile-bank/card-profile-bank.component';
import { CardRecommendComponent } from './card-recommend/card-recommend.component';
import { GameComponent } from './game/game.component';
 
@NgModule({

  imports: [
    CommonModule,
    RouterModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    CardImageComponent,
    CardListComponent,
    CardRegisterComponent,
    CardProfileBankComponent,
    CardRecommendComponent,
    GameComponent,
    
    
  
  ],
  exports: [
    CardListComponent,
    CardImageComponent,
    CardRegisterComponent,
    CardProfileBankComponent,
    CardRecommendComponent,
    GameComponent
    
  ],

})
export class CardModule { }
