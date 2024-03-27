import { Component, Directive, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { A2hsService } from 'src/app/a2hs.service';
import { imgApi } from 'src/app/common/constant/contants';
import { HttpService } from 'src/app/service/http.service';
declare var $: any;


@Component({
  selector: 'app-game001',
  templateUrl: './game001.component.html',
  styleUrls: ['./game001.component.css'],
})
export class Game001Component implements OnInit {
  @Directive({ selector: 'img' })
  favoriteList: any[] = [];
  listGames: any[] = [
    // { text: "", url: "./assets/image/sub-egame-vt2x.png", favorite: false, path: "/games/game001-detail" },
    // { text: "", url: "./assets/image/sub-egame-ameba2x.png", favorite: true, path: "/games/game001-detail" },
    // { text: "", url: "./assets/image/sub-egame-cq92x.png", favorite: false, path: "/games/game001-detail" },
    // { text: "", url: "./assets/image/sub-egame-mg2x.png", favorite: false, path: "/games/game001-detail" },
  ];
  checkWindow1 = false;
  fbAuthWindow;
  game: any[] = [];
  imgApi: any = imgApi
  username: string;
  productCode: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpService,
    public a2hs: A2hsService
  ) { }

  ngOnInit(): void {
    this.productCode = this.route.snapshot.queryParams['productCode'] || '';
    this.username = localStorage.getItem('username');
    // this.getFavorite();
    this.getListGame();
    this.getGame();
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

  getListGame() {
    this.httpClient.doGet('web-player/playgame/game-list').subscribe((res) => {
      this.game = res.data;
    });
  }
  goListGame(gameGroupCode, gameName) {
    this.router.navigate(['/games/game001-view'], {
      queryParams: {
        gameGroupCode: gameGroupCode,
        gameName: gameName
      },
    });
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

  goGameFavorite(item, image2, providerCode) {
    this.httpClient
      .doPost('web-player/playgame/launch-game', {
        username: this.username,
        userId: this.username,
        gameCode: item,
        iconUrl: image2,
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
  }

  goToGammeList(providerCode, displayName) {
    this.router.navigate(['/games/game001-detail'], {
      queryParams: {
        providerCode: providerCode,
        displayName: displayName
      },
    });
  }

  goTo(providerCode, openType, iconUrl,displayName) {
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
          displayName:displayName
        },
      });
    }
  }
  getGame() {
    this.httpClient
      .doGet('web-player/playgame/provider-list/' + this.productCode)
      .subscribe((res) => {
        this.listGames = res.data;
      });
  }
  getFavorite() {
    this.httpClient
      .doGet('web-player/game-favorite/get-frequent/' + this.username)
      .subscribe((res) => {
        // //console.log(res.data);
        res.data.forEach((data, index) => {
          if (data.providerCode != null) {
            if (index < 5) {
              this.favoriteList.push(data);
            }
          }
        });
      });
  }

  favorite(index) {
    this.listGames[index].favorite = !this.listGames[index].favorite;
  }
}
