import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutComponent } from 'src/app/common/layout/layout.component';
@Component({
  selector: 'app-user005',
  templateUrl: './user005.component.html',
  styleUrls: ['./user005.component.css']
})
export class User005Component implements OnInit {
  dashBoard: any[] = []
  constructor(
    private layout: LayoutComponent,
    private router: Router,
  ) {
    layout.isMoney = false
  }
  ngOnDestroy(): void {
    this.layout.isMoney = true
  }
  ngOnInit(): void {
  }
  goToPath(path) {
    this.router.navigate([path], { });
    
  }
}
