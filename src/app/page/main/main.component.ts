import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { LayoutComponent } from 'src/app/common/layout/layout.component';
import { ModalPromotionsComponent } from 'src/app/component/modal/modal-promotions/modal-promotions.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { A2hsService } from 'src/app/a2hs.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit, OnDestroy {
  @ViewChild('showModal', { static: true }) showModal: ModalPromotionsComponent;
  isShowButton = false;
  modalRef: BsModalRef;
  listFavorite: any[] = [
    { text: '1', url: 'cicle-001.png' },
    { text: '2', url: 'cicle-002.png' },
    { text: '3', url: 'cicle-000.png' },
    { text: '4', url: 'cicle-000.png' },
  ];
  listGames: any[] = [];

  username: any;
  money: any = '0.00';
  fieldTextType: Boolean = false;
  result: any;
  first: any[] = [];
  last2: any[] = [];
  last3b: any[] = [];
  last3f: any[] = [];
  displayDate: any;
  constructor(
    private httpClient: HttpService,
    private router: Router,
    private modalService: BsModalService,
    private layoutComponent: LayoutComponent,
    public a2hs: A2hsService
  ) { }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.getMoney();
    this.getGame();
    this.layoutComponent.isProfile = false;
  }

  ngOnDestroy() {
    this.layoutComponent.isProfile = true;
  }
  goToPath(path) {
    this.router.navigate([path], {});
  }
  clickSelectGoto() {
    this.isShowButton = !this.isShowButton;
  }

  onNever() {
    localStorage.setItem('closeModal', 'close');
    this.modalRef.hide();
  }

  openModal() {
    this.modalRef = this.modalService.show(this.showModal, {
      class: 'modal-dialog-centered',
    });
  }
  getGame() {
    this.httpClient
      .doGet('web-player/playgame/product-list')
      .subscribe((res) => {
        this.listGames = res.data;
      });
  }
  closeModal() {
    this.modalRef.hide();
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  goTo() {
    this.router.navigate(['/lottery/game-lotto'], {});
  }
  getMoney() {
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
      });
  }

  enterGame(providerCode?, openType?, iconUrl?) {
    if (openType == 'ONEPAGE') {
      this.httpClient
        .doPost('web-player/playgame/launch-game', {
          username: this.username,
          iconUrl: iconUrl,
          providerCode: providerCode,
        })
        .subscribe((res) => {
          // if (this.a2hs.isChrome == true) {
          //   this.openFBAuth(res.data.url)
          // } else {
          //   this.openFBAuth2(res.data.url)
          //   // document.location.href = res.data.url;
          // }
        });
    } else {
      this.router.navigate(['/games/game001-detail'], {
        queryParams: {
          providerCode: providerCode,
        },
      });
    }
  }

  openFBAuth(url) {
    // this.fbAuthWindow = window.open(url);
    // this.checkWindow1 = true;
    // setTimeout(() => {
    //   this.checkAuthWindow('fb')
    // }, 1000);
  }

  openFBAuth2(url) {
    // this.fbAuthWindow = window.location.href = url;
    // this.checkWindow1 = true;
    // setTimeout(() => {
    //   this.checkAuthWindow('fb')
    // }, 1000);
  }

  openProfileBank() {
    this.router.navigate(['/profile']);
  }

  openRecommendUntra() {
    this.router.navigate(['/recommend/recommend-user-tab3']);
  }
  openRecommend() {
    this.router.navigate(['/lottery/results/lotto-results01']);
  }
  openContract() {
    this.router.navigate(['/user/user002']);
  }
  openPoylottery() {
    this.router.navigate(['/lottery/poy-lotto/poyLottery005']);
  }
  openSerieslottery() {
    this.router.navigate(['/lottery/series-lotery']);
  }
}
