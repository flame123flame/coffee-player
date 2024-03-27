import { NgModule, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MainPipeModule } from '../pipe/main-pipe.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    MainPipeModule,
    LayoutRoutingModule, MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatBadgeModule,
    ModalModule
  ]
})
export class LayoutModule { }
