import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { ModalPromotionsComponent } from './modal-promotions/modal-promotions.component';
@NgModule({
  declarations: [ModalPromotionsComponent],
  imports: [
    // BrowserModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [
    ModalPromotionsComponent
  ]
})
export class ModalModule { }
