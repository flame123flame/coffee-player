import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpService } from 'src/app/service/http.service';
import { RecommendComponent } from '../recommend/recommend.component';

@Component({
  selector: 'app-recommend001',
  templateUrl: './recommend001.component.html',
  styleUrls: ['./recommend001.component.css'],
})
export class Recommend001Component implements OnInit {
  dashBoard: any = {
    downLineOneCount: 0,
    downLineTwoCount: 0,
    currentOneIncome: 0,
    currentTwoIncome: 0,
    totalIncome: 0,
    recommendCode: '',
    channelDetailList: null,
  };
  listChannal: any[] = [
    { text: 'หวยออนไลน์ (8%)', num: '1', cost: '100.00' },
    { text: 'เกมส์ยิงปลา (8%)', num: '3', cost: '0.00' },
    { text: 'เกมส์กีฬา (8%)', num: '3', cost: '0.00' },
  ];
  myPath: any = 'https://finnandrich.com/#/affiliate?af=';
  isCopy: Boolean = false;
  listMenu: any[] = [];
  constructor(
    private httpClient: HttpService,
    private recommendComponent: RecommendComponent
  ) { }

  ngOnInit(): void {
    this.getDashBoard();
    this.recommendComponent.clickTap(1);
  }
  copyText() {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.myPath;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.isCopy = true;
  }
  getDashBoard() {
    this.httpClient
      .doGet(
        'web-player/affiliate-player/get-detail/' +
        localStorage.getItem('username')
      )
      .subscribe((res) => {
        this.dashBoard = res.data;
        this.myPath = this.myPath + this.dashBoard.recommendCode;
        // //console.log(this.dashBoard.affiliateNetworkList.length);
        this.listMenu = [
          {
            name: 'สมาชิกท่ีแนะนำได้',
            event: this.dashBoard.downLineOneCount,
          },
          {
            name: 'สมาชิกขั้นที่ 2',
            event: this.dashBoard.downLineTwoCount,
          },
          {
            name: 'รายได้ปัจจุบัน',
            event: this.dashBoard.totalIncome,
          },
          {
            name: 'รายได้จากสมาชิกขั้นที่2',
            event: this.dashBoard.currentTwoIncome,
          },
        ];
      });
  }
}
