import { Component, Directive, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { A2hsService } from 'src/app/a2hs.service';
import { HttpService } from 'src/app/service/http.service';
import { imgApi } from 'src/app/common/constant/contants';import { Location } from '@angular/common';
@Component({
  selector: 'app-game001-detail',
  templateUrl: './game001-detail.component.html',
  styleUrls: ['./game001-detail.component.css'],
})
export class Game001DetailComponent implements OnInit {
  @Directive({ selector: 'img' })
  trueCount = 0;
  falseCount = 0;
  providerCodeSand: any;
  listGames: any[] = [];
  checkWindow1 = false;
  fbAuthWindow;
  imgApi: any = imgApi
  listImgGames: any[] = [
    {
      image1: './assets/image/games/game01.png',
      image2: './assets/image/games/game01detail.png',
    },
    {
      image1: './assets/image/games/game02.png',
      image2: './assets/image/games/game02detail.png',
    },
    {
      image1: './assets/image/games/game03.png',
      image2: './assets/image/games/game03detail.png',
    },
  ];
  imgDefaultNone: String = "./assets/image/games/none.png"
  listImgNone: any[] = [
    {
      image2: this.imgDefaultNone,
      boolean: false,
    },
    {
      image2: this.imgDefaultNone,
      boolean: false,
    },
    {
      image2: this.imgDefaultNone,
      boolean: false,
    },
    {
      image2: this.imgDefaultNone,
      boolean: false,
    },
    {
      image2: this.imgDefaultNone,
      boolean: false,
    },
  ];

  listImgDetail: any[] = [
    './assets/image/games/game01.png',
    './assets/image/games/game02.png',
    './assets/image/games/game03.png',
    './assets/image/games/game01.png',
    './assets/image/games/game01.png',
    './assets/image/games/game01.png',
  ];
  listType: any[] = [
    { name: '', url: './assets/image/games/game01.png', path: '' },
    { name: '', url: './assets/image/sub-egame-cq9@2x.png', path: '' },
    { name: '', url: './assets/image/sub-egame-ameba@2x.png', path: '' },
  ];
  imgLogo = "./assets/image/logo.png"
  favoriteList: any[] = [];
  listTRUE: any[] = [];
  list: any[] = [];
  username: any;
  money: any;
  displayName: any;
  constructor(
    public a2hs: A2hsService,
    private httpClient: HttpService,
    private route: ActivatedRoute,
    private router: Router, private location: Location
  ) { }

  ngOnInit(): void {
    this.displayName = this.route.snapshot.queryParams['displayName'] || '';
    this.providerCodeSand = this.route.snapshot.queryParams['providerCode'] || '';
    this.username = localStorage.getItem('username');
    this.getFavorite();
    this.getGames();
  }
  openFBAuth(url) {
    this.fbAuthWindow = window.open(url);
    this.checkWindow1 = true;
    setTimeout(() => {
      this.checkAuthWindow('fb')
    }, 1000);
  }
  openFBAuth2(url) {
    this.fbAuthWindow = window.location.href = url;
    this.checkWindow1 = true;
    setTimeout(() => {
      this.checkAuthWindow('fb')
    }, 1000);
  }
  back() {
    this.location.back();
  }

  checkAuthWindow(win) {
    if (this.checkWindow1 == true) {
      if (win == 'fb') {
        if (this.fbAuthWindow.closed) {
          window.location.reload();
        } else {
          setTimeout(() => {
            this.checkAuthWindow('fb')
          }, 1000);
        }
      }
    }
  }
  favoriteGame(item) {
    this.httpClient
      .doPost('web-player/game-favorite/change-favorite', {
        username: this.username,
        userId: this.username,
        providerCode: item.providerCode,
        gameCode: item.code,
        gameName: item.gameName,
        balance: this.money,
      })
      .subscribe((res) => {
        // window.open(res.data.url, '_blank');
      });
  }

  getGames() {
    this.httpClient
      .doGet('web-player/playgame/game-list/provider/' + this.providerCodeSand)
      .subscribe((res) => {
        this.listGames = res.data;
        for (let index = 0; index < this.listGames.length; index++) {
          this.listGames[index].favorite = false;
        }
        for (let index1 = 0; index1 < this.listGames.length; index1++) {
          for (let index2 = 0; index2 < this.favoriteList.length; index2++) {
            if (
              this.listGames[index1].gameCode ==
              this.favoriteList[index2].gameCode
            ) {
              this.listGames[index1].favorite = true;
            }
          }
        }
        for (let i = 0; i < this.favoriteList.length; i++) {
          this.listImgNone[i].image2 = this.favoriteList[i].iconUrl;
          this.listImgNone[i].boolean = true;

        }
      });
  }

  getFavorite() {
    this.httpClient
      .doGet('web-player/game-favorite/get-favorite/' + this.username)
      .subscribe((res) => {
        this.favoriteList = res.data;
        for (let index = 0; index < this.listGames.length; index++) {
          this.listGames[index].favorite = false;
        }
        for (let index1 = 0; index1 < this.listGames.length; index1++) {
          for (let index2 = 0; index2 < this.favoriteList.length; index2++) {
            if (this.listGames[index1].gameCode == this.favoriteList[index2].gameCode) {
              this.listGames[index1].favorite = true;
            }
          }
        }
        for (let i = 0; i < this.favoriteList.length; i++) {
          this.listImgNone[i].image2 = this.favoriteList[i].iconUrl;
          this.listImgNone[i].providerCode = this.favoriteList[i].providerCode;
          this.listImgNone[i].gameName = this.favoriteList[i].gameName;
          this.listImgNone[i].gameCode = this.favoriteList[i].gameCode;

          this.listImgNone[i].boolean = true;

        }
      });
  }

  favorite(index, item, data) {
    if (
      this.listGames[index].favorite == undefined ||
      this.listGames[index].favorite == false
    ) {
      for (let index2 = 0; index2 < this.listImgNone.length; index2++) {
        if (this.listImgNone[index2].boolean == false) {
          this.listImgNone[index2].image2 = item;
          this.listImgNone[index2].boolean = true;
          break;
        }
      }
    } else {
      let e;
      for (let index3 = 0; index3 < this.listImgNone.length; index3++) {

        if (item == this.listImgNone[index3].image2) {

          e = index3;
          break;
        }
      }
      this.listImgNone.splice(e, 1);
      this.listImgNone.push({
        image2: this.imgDefaultNone,
        image3: false,
      });
    }
    this.listGames[index].favorite = !this.listGames[index].favorite;
    let viewStatus;
    if (this.listGames[index].favorite == true) {
      viewStatus = 'FAV';
      //console.log(viewStatus);
    } else if (this.listGames[index].favorite == false) {
      viewStatus = 'NON_FAV';
      //console.log(viewStatus);
    }

    this.httpClient
      .doPost('web-player/game-favorite/change-favorite', {
        username: this.username,
        gameCode: data.gameCode,
        gameName: data.gameName,
        viewStatus: viewStatus,
        iconUrl: item,
        providerCode: data.providerCode,
      })
      .subscribe((res) => {
        this.getFavorite();
      });
  }
  goGameFavorite(item) {

    this.httpClient
      .doPost('web-player/playgame/launch-game', {
        username: this.username,
        userId: this.username,
        gameCode: item.gameCode,
        gameName: item.gameName,
        iconUrl: item.image2,
        providerCode: item.providerCode,
      })
      .subscribe((res) => {
        if (this.a2hs.isChrome == true) {
          this.openFBAuth(res.data.url)
        } else {
          this.openFBAuth2(res.data.url)
        }
      });
  }

  goGame(item) {
    //console.log('item', item);

    this.httpClient
      .doPost('web-player/playgame/launch-game', {
        username: this.username,
        userId: this.username,
        gameCode: item.gameCode,
        gameName: item.gameName,
        iconUrl: item.image2,
        providerCode: item.providerCode,
      })
      .subscribe((res) => {
        if (this.a2hs.isChrome == true) {
          this.openFBAuth(res.data.url)
        } else {
          this.openFBAuth2(res.data.url)
          // document.location.href = res.data.url;
        }
      });
  }

  getMoney(item) {
    this.httpClient
      .doGet('web-player/wallet/get-balance/' + this.username)
      .subscribe((res) => {
        this.money = res.data;
        if (this.money == null) {
          this.money = '0.00';
        }
        this.money = new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(this.money);
        this.goGame(item);
      });
  }
}
