import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { RecommendComponent } from '../recommend/recommend.component';

@Component({
  selector: 'app-recommend003',
  templateUrl: './recommend003.component.html',
  styleUrls: ['./recommend003.component.css'],
})
export class Recommend003Component implements OnInit {
  myPath: any = 'https://finnandrich.com/#/affiliate?af=';
  isCopy: Boolean = false;
  dashBoard: any = {
    affiliateCode: '',
    affiliateCodeUp: null,
    affiliateGroupCode: null,
    affiliateNetworkList: [],
    banner: null,
    channelDetailList: null,
    clickCount: 0,
    createdBy: '',
    createdDate: '',
    detail: null,
    groupName: null,
    id: 0,
    income: 0,
    pendingWithdraw: 0,
    totalIncome: 0,
    updatedBy: null,
    updatedDate: null,
    username: '',
  };
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
  listMount: any[] = [
    {
      name: 'กรกฏาคม 2563',
      isActive: false,
    },
    {
      name: 'สิงหาคม 2563',
      isActive: true,
    },
    {
      name: 'กันยายน 2563',
      isActive: false,
    },
  ];
  listAffShow: any[] = [];
  constructor(
    private httpClient: HttpService,
    private recommendComponent: RecommendComponent
  ) { }

  ngOnInit(): void {
    this.recommendComponent.clickTap(3);
    // this.getAffiliate()
    this.getDashBoard();
  }
  getAffiliate() {
    let affiliateCode = '429940355509600';
    this.httpClient
      .doGet('web-player/affiliate-player/trigger-affiliate/' + affiliateCode)
      .subscribe((res) => {
        //console.log(res.data);
      });
  }
  selectFn(idx) {
    for (let index = 0; index < this.listMount.length; index++) {
      if (idx == index) {
        this.listMount[index].isActive = true;
      } else {
        this.listMount[index].isActive = false;
      }
    }
  }

  getDashBoard() {
    this.httpClient
      .doGet(
        'web-player/affiliate-player/recommand-code/' +
        localStorage.getItem('username')
      )
      .subscribe((res) => {
        this.dashBoard = res.data;
        this.myPath = this.myPath + this.dashBoard;
      });
  }
}
