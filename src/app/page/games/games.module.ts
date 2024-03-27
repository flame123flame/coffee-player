import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { Game001Component } from './game001/game001.component';
import { Game002Component } from './game002/game002.component';
import { Game003Component } from './game003/game003.component';
import { Game004Component } from './game004/game004.component';
import { Game005Component } from './game005/game005.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Game001DetailComponent } from './game001-detail/game001-detail.component';
import { ComponentsModule } from 'src/app/component/components.module';
import { GameTestComponent } from './game-test/game-test.component';
import { GameViewComponent } from './game-view/game-view.component';

@NgModule({
  declarations: [Game001Component, Game002Component, Game003Component, Game004Component, Game005Component, Game001DetailComponent, GameTestComponent, GameViewComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    GamesRoutingModule, MatButtonModule, MatIconModule
  ]
})
export class GamesModule { }
