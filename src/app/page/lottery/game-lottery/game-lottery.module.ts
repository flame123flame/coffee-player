import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameLotteryRoutingModule } from './game-lottery-routing.module';
import { GameLotto001Component } from './game-lotto001/game-lotto001.component';
import { GameLotteryComponent } from './game-lottery.component';
import { GameLotto002Component } from './game-lotto002/game-lotto002.component';
import { GameLotto003Component } from './game-lotto003/game-lotto003.component';
import { GameLotto004Component } from './game-lotto004/game-lotto004.component';
import { CountdownModule } from 'ngx-countdown';
import { AlertModule } from 'ngx-bootstrap/alert';
import { MainPipeModule } from 'src/app/common/pipe/main-pipe.module';


@NgModule({
  declarations: [GameLotto001Component, GameLotteryComponent, GameLotto002Component, GameLotto003Component, GameLotto004Component],
  imports: [
    AlertModule,
    FormsModule,
    CountdownModule,
    CommonModule,
    MainPipeModule,
    GameLotteryRoutingModule
  ]
})
export class GameLotteryModule { }
