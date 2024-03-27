import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutComponent } from 'src/app/common/layout/layout.component';
import { HttpService } from 'src/app/service/http.service';
@Component({
  selector: 'app-user004',
  templateUrl: './user004.component.html',
  styleUrls: ['./user004.component.css'],
})
export class User004Component implements OnInit {
  tabIdx1 = 0;
  tabIdx2 = 0;
  listData: any[] = [];
  listPromotion: any[] = [];
  listBet: any[] = [];
  listCashBack: any[] = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  constructor(
    private router: Router,
    private httpClient: HttpService,
    private layout: LayoutComponent
  ) { }

  ngOnInit(): void {
    this.tabIdx1 = 1;
    this.getHistory();
    this.getPromotion();
    this.router.url.indexOf("user004-sub002") >= 0 ? this.tabSet(2) : this.router.url.indexOf("user004-sub002") >= 0? this.tabSet(1):null
    //console.log('window.location.href = ', window.location.href);
  }
  getHistory() {
    this.httpClient
      .doGet(
        'web-player/deposit/get-history/' + localStorage.getItem('username')
      )
      .subscribe((res) => {
        this.listData = res.data;
      });
  }
  getPromotion() {
    this.httpClient
      .doGet(
        'web-player/promotion-request/promotion-history/' +
        localStorage.getItem('username')
      )
      .subscribe((res) => {
        this.listPromotion = res.data;
      });
  }
  tab01() {
    this.tabIdx1 = 1;
    this.tabIdx2 = 0;
    this.router.navigate(['/user/user004/user004-sub001']);
  }
  tabSet(set: Number) {
    if (set == 1) {
      this.tabIdx1 = 1;
      this.tabIdx2 = 0;
    } else if (set == 2) {
      this.tabIdx1 = 0;
      this.tabIdx2 = 2;
    }
  }
  tab02() {
    this.tabIdx1 = 0;
    this.tabIdx2 = 2;
    this.router.navigate(['/user/user004/user004-sub002']);
  }
}
