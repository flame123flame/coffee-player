import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameTestComponent } from './game-test/game-test.component';
import { GameViewComponent } from './game-view/game-view.component';
import { Game001DetailComponent } from './game001-detail/game001-detail.component';
import { Game001Component } from './game001/game001.component';
import { Game002Component } from './game002/game002.component';
import { Game003Component } from './game003/game003.component';
import { Game004Component } from './game004/game004.component';
import { Game005Component } from './game005/game005.component';

const routes: Routes = [
  { path: '', component: Game001Component },
  { path: 'game001', component: Game001Component },
  { path: 'game001-view', component: GameViewComponent },
  { path: 'game-test', component: GameTestComponent },
  { path: 'game001-detail', component: Game001DetailComponent },
  { path: 'game002', component: Game002Component },
  { path: 'game003', component: Game003Component },
  { path: 'game004', component: Game004Component },
  { path: 'game005', component: Game005Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
