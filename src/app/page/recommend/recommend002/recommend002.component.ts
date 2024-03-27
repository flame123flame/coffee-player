import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { RecommendComponent } from '../recommend/recommend.component';
interface affiliateMan {
  id?: Number;
  username?: String;
  affiliateCode?: String;
  affiliateCodeUp?: String;
  registerDate?: String;
  test?: String;
  totalBet?:any;
  channelDetailList?:any;
}
@Component({
  selector: 'app-recommend002',
  templateUrl: './recommend002.component.html',
  styleUrls: ['./recommend002.component.css'],
})
export class Recommend002Component implements OnInit {
  isShow = true;
  listAff: affiliateMan[] = [];
  listAffShow: affiliateMan[] = [];
  listUser: any[] = [];
  dashBoard: any = {
    username: '',
    totalBet: 0,
    totalIncome: 0,
    affiliateNetworkList: this.listAff,
    channelDetailList: null,
  };
  textSearch: '';
  constructor(
    private router: Router,
    private httpClient: HttpService,
    private recommendComponent: RecommendComponent
  ) {}

  ngOnInit(): void {
    this.getDashBoard();
    this.recommendComponent.clickTap(2);
  }

  goToe(item) {
    const queryParams: any = {};

    const arrayOfValues = item;
    queryParams.myArray = JSON.stringify(arrayOfValues);
    const navigationExtras: NavigationExtras = {
      queryParams,
    };

    this.router.navigate(
      ['/recommend/recommend-user-tab2-detail'],
      navigationExtras
    );
  }
  getDashBoard() {
    this.httpClient
      .doGet(
        'web-player/affiliate-player/get-downline/' +
          localStorage.getItem('username')
      )
      .subscribe((res) => {
        this.dashBoard = res.data;
        this.listAff = res.data;
        if (this.listAff.length != 0) {
          this.isShow = true;
        } else {
          this.isShow = false;
        }

        this.listAffShow = this.listAff; // listAffShow for show,query and another one for base data
      });
  }
  findTable() {
    this.listAffShow = this.listAff;
    let data = [];
    if (this.textSearch) {
      this.listAffShow.forEach((res) => {
        if (res.username.indexOf(this.textSearch) >= 0) {
          data.push(res);
        }
      });
      this.listAffShow = data;
    } else {
      this.listAffShow = this.listAff;
    }
  }
}
