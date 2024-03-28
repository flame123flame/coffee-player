import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { Router } from '@angular/router';

import { listBank } from 'src/app/common/constant/bank-constant';
import { LayoutComponent } from 'src/app/common/layout/layout.component';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-profile-bank001',
  templateUrl: './profile-bank001.component.html',
  styleUrls: ['./profile-bank001.component.css'],
})
export class ProfileBank001Component implements OnInit {
  url_img: string = './assets/image/bank/';
  url: any;
  realName: any;
  postList = [];
  turnOverData: any = {
    dateActive: null,
  };
  turnOverDataRat: any;
  listUser = {
    src: '',
    color: '',
    bankCode: '',
    realName: '',
    bankAccount: '',
    bankNameTh: '',
    color2: '',
  };
  username: any;
  constructor(
    private httpClient: HttpService,
    private router: Router,
    private layoutComponent: LayoutComponent,
    private _auth: AuthService,
  ) {
    this.layoutComponent.isProfile = false;
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    this.layoutComponent.isProfile = true;
  }
  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.realName = localStorage.getItem('realName');
    this.getUser();
    this.getTurnOver();
    this.getTurnOverRebate();
    this.postList = this.layoutComponent.getMessage();
  }
  goToPath(path) {
    this.router.navigate([path], {});
  }
  getTurnOver() {
    this.httpClient
      .doGet('web-player/customer/get-bet-daily/' + this.username)
      .subscribe((res) => {
        this.turnOverData = res.data;
      });
  }
  getTurnOverRebate() {
    this.httpClient
      .doGet('web-player/customer/get-rebate-detail/' + this.username)
      .subscribe((res) => {
        this.turnOverDataRat = res.data.currentRebate;
      });
  }

  getUser() {
    this.httpClient
      .doGet('web-player/customer/get-customer-by-id/' + this.username)
      .subscribe((res) => {
        this.listUser.bankAccount = res.data.bankAccount;
        this.listUser.realName = res.data.realName;
        this.listUser.bankCode = res.data.bankCode;
        this.listUser.bankNameTh = res.data.bankNameTh;
        listBank.forEach((res) => {
          if (res.code == this.listUser.bankCode) {
            this.listUser.color = res.color;
            this.listUser.color2 = res.color2;
            this.listUser.src = res.src;
          }
        });
      });
  }

  logout() {
    this._auth.logout();
  }
}
