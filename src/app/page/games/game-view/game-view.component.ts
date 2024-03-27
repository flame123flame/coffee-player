import { Component, Directive, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { A2hsService } from 'src/app/a2hs.service';
import { imgApi } from 'src/app/common/constant/contants';
import { HttpService } from 'src/app/service/http.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.css'],
})
export class GameViewComponent implements OnInit {
  @Directive({ selector: 'img' })
  imgApi: any = imgApi
  gameGroupCode: any;
  productCode: string;
  username: string;
  gameName:any;
  checkWindow1 = false;
  fbAuthWindow;
  constructor(  private location: Location,public a2hs: A2hsService,private httpClient: HttpService,private router: Router, private route: ActivatedRoute) { }

  listGameMont: any[] = [];

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.gameGroupCode = this.route.snapshot.queryParams['gameGroupCode'] || '';
    this.gameName = this.route.snapshot.queryParams['gameName'] || '';
    this.getGame();
  }
  back() {
    this.location.back();
  }
  getGame() {
    this.httpClient
      .doGet('web-player/playgame/game-list/group/' + this.gameGroupCode)
      .subscribe((res) => {
        this.listGameMont = res.data;
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
      }
      });
  }
}
