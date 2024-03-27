import { Component, Directive, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { A2hsService } from 'src/app/a2hs.service';
import { imgApi } from 'src/app/common/constant/contants';
import { HttpService } from 'src/app/service/http.service';
@Component({
  selector: 'app-game004',
  templateUrl: './game004.component.html',
  styleUrls: ['./game004.component.css'],
})
export class Game004Component implements OnInit {
  @Directive({ selector: 'img' })
  listGames: any[] = [
    // { text: "", url: "./assets/image/sub-sports-cmdbet@2x.png", favorite: false },
    // { text: "", url: "./assets/image/sub-sports-saba@2x.png", favorite: true },
    // { text: "", url: "./assets/image/sub-sports-sbobet@2x.png", favorite: false },
    // { text: "", url: "./assets/image/sub-sports-ufabet@2x.png", favorite: false },
  ];
  productCode: any;
  username: any;
  checkWindow1 = false;
  fbAuthWindow;
  imgApi: any = imgApi
  constructor(
    public a2hs: A2hsService,
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpService
  ) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.productCode = this.route.snapshot.queryParams['productCode'] || '';
    this.getGame();
  }
  getGame() {
    this.httpClient
      .doGet('web-player/playgame/provider-list/' + this.productCode)
      .subscribe((res) => {
        this.listGames = res.data;
      });
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

  goGame(item) {
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
  favorite(index) {
    this.listGames[index].favorite = !this.listGames[index].favorite;
  }
}
