import { Component, Directive, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { A2hsService } from 'src/app/a2hs.service';
import { imgApi } from 'src/app/common/constant/contants';
import { HttpService } from 'src/app/service/http.service';
@Component({
  selector: 'app-game003',
  templateUrl: './game003.component.html',
  styleUrls: ['./game003.component.css'],
})
export class Game003Component implements OnInit {
  @Directive({ selector: 'img' })
  imgApi: any = imgApi
  listGames: any[] = [
    // { text: "", url: "./assets/image/sub-live-ag@2x.png", favorite: false },
    // { text: "", url: "./assets/image/sub-live-allbet@2x.png", favorite: true },
    // { text: "", url: "./assets/image/sub-live-dg@2x.png", favorite: false },
    // { text: "", url: "./assets/image/sub-live-mx@2x.png", favorite: false },
    // { text: "", url: "./assets/image/sub-live-pt@2x.png", favorite: false },
    // { text: "", url: "./assets/image/sub-live-sa@2x.png", favorite: false },
  ];
  checkWindow1 = false;
  fbAuthWindow;
  productCode: any;
  username: any;
  constructor(
    public a2hs: A2hsService,
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpService
  ) { }

  ngOnInit(): void {
    this.productCode = this.route.snapshot.queryParams['productCode'] || '';
    this.getGame();
    this.username = localStorage.getItem('username');
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
  getGame() {
    this.httpClient
      .doGet('web-player/playgame/provider-list/' + this.productCode)
      .subscribe((res) => {
        this.listGames = res.data;
      });
  }

  goTo(providerCode, openType, iconUrl) {
    if (openType == 'ONEPAGE') {
      this.httpClient
        .doPost('web-player/playgame/launch-game', {
          username: this.username,
          iconUrl: iconUrl,
          providerCode: providerCode,
        })
        .subscribe((res) => {
          if (this.a2hs.isChrome == true) {
            this.openFBAuth(res.data.url)
          } else {
            this.openFBAuth2(res.data.url)
            // document.location.href = res.data.url;
          }
        });
    } else {
      this.router.navigate(['/games/game001-detail'], {
        queryParams: {
          providerCode: providerCode,
        },
      });
    }
  }
  favorite(index) {
    this.listGames[index].favorite = !this.listGames[index].favorite;
  }
}
