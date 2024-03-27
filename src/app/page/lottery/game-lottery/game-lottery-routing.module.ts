import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameLotteryComponent } from './game-lottery.component';
import { GameLotto001Component } from './game-lotto001/game-lotto001.component';
import { GameLotto002Component } from './game-lotto002/game-lotto002.component';
import { GameLotto003Component } from './game-lotto003/game-lotto003.component';
import { GameLotto004Component } from './game-lotto004/game-lotto004.component';

const routes: Routes = [
  {
    path: '', component: GameLotteryComponent, children: [
      {
        path: 'lotto-game', component: GameLotto001Component
      },
      {
        path: 'yeekee-play', component: GameLotto002Component
      },
      {
        path: 'yeekee', component: GameLotto003Component
      },
      {
        path: 'game004', component: GameLotto004Component
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameLotteryRoutingModule { }
