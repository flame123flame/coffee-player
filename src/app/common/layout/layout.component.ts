import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
declare const SockJS;
declare const Stomp;

import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ModalPromotionsComponent } from 'src/app/component/modal/modal-promotions/modal-promotions.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

interface link {
  text?: String;
  link?: String;
  active?: Boolean;
  isGame?: Boolean;
  icon?: String;
  icon2?: String;
  productCode?: String;
}
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  @Input() isMoney: Boolean = true;
  isSelect: Boolean = false;
  @ViewChild('showModal', { static: true }) showModal: ModalPromotionsComponent;
  @ViewChild('showAlertContirmText', { static: true })
  showAlertContirmText: ModalPromotionsComponent;
  @ViewChild('sidenav') sidenav: any;
  mode = new FormControl('over');
  username: any;
  money: any = '0.00';
  postList = [];
  Promotion: any;
  listGames: any[] = [
    // { name: "เกมส์สล็อต/ยิงปลา", url: "assets/image/asset/fish.png", link: "/games/game001" },
    // { name: "คาสิโน", url: "assets/image/asset/casino.png", link: "/games/game003" },
    // { name: "กีฬา", url: "assets/image/asset/ball.png", link: "/games/game004" },
    // { name: "แทงหวย", url: "assets/image/asset/lotto.png", link: "/lottery/game-lotto" },
  ];
  listGamesConcat: any[] = [
    {
      iconUrl: 'assets/image/asset/deposit-cicle.png',
      nameEn: 'Deposit',
      nameTh: 'ฝากเงิน',
      productCode: 'DEPOSIT',
    },
    {
      iconUrl: 'assets/image/asset/withdraw-circle.png',
      nameEn: 'Withdraw',
      nameTh: 'ถอนเงิน',
      productCode: 'WITHDRAW',
    },
  ];
  listLink: link[] = [
    {
      text: 'หน้าหลัก',
      productCode: 'd',
      link: '/',
      active: true,
      icon: 'home.PNG',
      icon2: 'home copy.png',
      isGame: false,
    },
    {
      text: 'แทงหวย',
      productCode: 'LOTTO',
      link: '/lottery/game-lotto',
      active: false,
      icon: 'lotto.svg',
      icon2: 'lotto copy.svg',
      isGame: true,
    },
    {
      text: 'ดูโพยหวย',
      productCode: 'GAMB',
      link: '/lottery/poy-lotto/poyLottery005',
      active: false,
      icon: 'slot.svg',
      icon2: 'slot copy.svg',
      isGame: true,
    },
    {
      text: 'ข้อมูลส่วนตัว',
      productCode: 'CASINO',
      link: '/profile',
      active: false,
      icon: 'casino.svg',
      icon2: 'casino copy.svg',
      isGame: true,
    }
  ];

  listLinkForGame: link[] = [
    {
      text: 'หน้าหลัก',
      link: '/',
      active: true,
      icon: 'home_1.svg',
      icon2: 'home_1 copy.svg',
      isGame: false,
    },
    {
      text: 'โปรโมชัน',
      link: '/promotion',
      active: false,
      icon: 'promotion.svg',
      icon2: 'promotion copy.svg',
      isGame: false,
    },
    {
      text: 'ฝากเงิน',
      link: '/deposit',
      active: false,
      icon: 'deposit.svg',
      icon2: 'deposit copy.svg',
      isGame: false,
    },
    {
      text: 'ถอนเงิน',
      link: '/profile/profile-bank002',
      active: false,
      icon: 'withdrow.svg',
      icon2: 'withdrow copy.svg',
      isGame: false,
    },
    {
      text: 'โปรไฟล์',
      link: '/profile/profile-bank001',
      active: false,
      icon: 'user.svg',
      icon2: 'user copy.svg',
      isGame: false,
    },
  ];
  listSideNav: link[] = [
    {
      text: 'ดูโพยหวย',
      link: 'lottery/poy-lotto/poyLottery005',
      active: false,
      icon: 'assets/image/asset/poy.png',
      icon2: 'assets/image/asset/poy active.png',
    },
    {
      text: 'เลขชุด',
      link: '/lottery/series-lotery',
      active: false,
      icon: 'assets/image/asset/set.png',
      icon2: 'assets/image/asset/set2.png',
    },
    {
      text: 'เช็คผลรางวัล',
      link: '/lottery/results/lotto-results01',
      active: false,
      icon: 'assets/image/asset/zoom.png',
      icon2: 'assets/image/asset/zoom active.png',
    },
    {
      text: 'โปรโมชั่น',
      link: '/promotion',
      active: false,
      icon: 'assets/image/asset/place tag2.png',
      icon2: 'assets/image/asset/tag price active.png',
    },
    {
      text: 'รายงานเครดิต',
      link: '/user/user004/user004-sub001',
      active: false,
      icon: 'assets/image/asset/doc.png',
      icon2: 'assets/image/asset/doc2.png',
    },
    {
      text: 'กล่องข้อความ',
      link: '/user/user003',
      active: false,
      icon: 'assets/image/asset/messageB.png',
      icon2: 'assets/image/asset/mail active.png',
    },
    {
      text: 'ติดต่อเรา',
      link: '/user/user002',
      active: false,
      icon: 'assets/image/asset/groub.png',
      icon2: 'assets/image/asset/manG active.png',
    },
    {
      text: 'ตั้งค่าบัญชี',
      link: '/user/user-setting',
      active: false,
      icon: 'assets/image/asset/hand2.png',
      icon2: 'assets/image/asset/hand active.png',
    },
  ];
  isGame: Boolean = false;
  isProfile: Boolean = true;
  isModelShow: Boolean = false;
  isCurveL: Boolean = true;
  isHeader: Boolean = true;
  selectData: any;
  listNotification: any[] = [];
  stompClient: any;
  rankImg: any;
  alertData: any;
  os: any;
  modalRef: BsModalRef;
  listPromotion: any[] = [];
  rankLavel: any;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private auth: AuthService,
    private router: Router,
    private httpClient: HttpService,
    private modalService: BsModalService
  ) {
    const serverUrl = environment.BASE_URL + '/socket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    this.router.events.subscribe((event) => {
      this.checkLink();
      window.scrollTo(0, 0);
    });
  }

  ngOnInit(): void {


    this.getGame();
    this.username = localStorage.getItem('username');
    // this.fullScreen()
    this.getMoney();
    this.checkLink();
    this.getMessage();
    this.getUser();

    //console.log(environment.BASE_URL + '/socket');
    this.stompClient.connect(
      // this.headerSend,
      // { "Access-Control-Allow-Origin": "*" },
      // 'EmEm',
      this.username,
      'password',
      (frame) => {
        this.stompClient.debug('connected to Socket!!!');


        this.subscribePost();
        this.subscribeDeposit();
        this.subscribeWithDraw();
      },
      (error) => {
        //console.log('when error', error);
      },
      (closeEvent) => {
        //console.log('when closeEvent', closeEvent);
      }
    );
  }
  ngAfterViewInit(): void {
    this.checkSav();

  }
  checkSav() {
    this.sidenav.opened ? this.document.body.classList.add('Scroll') : this.document.body.classList.remove("Scroll");
  }
  goToGame(link, productCode) {
    this.router.navigate([link], {
      queryParams: {
        productCode: productCode,
      },
    });
  }
  goToList(item) {
    if (item.productCode == 'LOTTO') {
      this.router.navigate(['/lottery/game-lotto'], {});
    } else if (item.productCode == 'SPORT') {
      this.router.navigate(['/games/game004'], {
        queryParams: {
          productCode: item.productCode,
        },
      });
    } else if (item.productCode == 'CASINO') {
      this.router.navigate(['/games/game003'], {
        queryParams: {
          productCode: item.productCode,
        },
      });
    } else if (item.productCode == 'DEPOSIT') {
      this.router.navigate(['/deposit'], {
        queryParams: {
          productCode: item.productCode,
        },
      });
    } else if (item.productCode == 'WITHDRAW') {
      this.router.navigate(['/profile/profile-bank002'], {
        queryParams: {
          productCode: item.productCode,
        },
      });
    } else {
      this.router.navigate(['/games/game001'], {
        queryParams: {
          productCode: item.productCode,
        },
      });
    }
  }
  getGame() {
    this.httpClient
      .doGet('web-player/playgame/product-list')
      .subscribe((res) => {
        this.listGames = res.data;
        this.listGames = this.listGames.concat(this.listGamesConcat);
      });
  }
  fullScreen() {
    var OSName = 'Unknown OS';
    if (navigator.userAgent.indexOf('Win') != -1) OSName = 'Windows';
    if (navigator.userAgent.indexOf('Mac') != -1) OSName = 'Macintosh';
    if (navigator.userAgent.indexOf('Linux') != -1) OSName = 'Linux';
    if (navigator.userAgent.indexOf('Android') != -1) {
      OSName = 'Android';
      document.body.requestFullscreen();
    }
    if (navigator.userAgent.indexOf('like Mac') != -1) OSName = 'iOS';
    this.os = OSName;
  }
  getUser() {
    localStorage.removeItem('groupCode');
    localStorage.removeItem('mobilePhone');
    localStorage.removeItem('realName');
    this.httpClient
      .doGet('web-player/customer/get-customer-by-id/' + this.username)
      .subscribe((res) => {
        this.rankImg = res.data.groupImg;
        this.rankLavel = res.data.level;
        localStorage.setItem('groupCode', res.data.groupCode);
        localStorage.setItem('mobilePhone', res.data.mobilePhone);
        localStorage.setItem('realName', res.data.realName);
      });
  }
  public subscribePost() {
    this.stompClient.subscribe('/post/' + this.username, (message) => {
      if (message.body) {
        this.postList.unshift(JSON.parse(message.body));
      }
    });
  }

  public subscribeDeposit() {
    this.stompClient.subscribe('/deposit/' + this.username, (message) => {
      if (message.body.toString().length > 0) {
        this.alertData = JSON.parse(message.body);
        this.openModalAlert();
      }
    });
  }
  public subscribeWithDraw() {
    this.stompClient.subscribe('/withdraw/' + this.username, (message) => {
      if (message.body.toString().length > 0) {
        this.alertData = JSON.parse(message.body);
        this.openModalAlert();
      }
    });
  }

  public disconnect() {
    this.stompClient.disconnect();
  }

  goMain() {
    this.router.navigate(['/']);
  }
  switchSideNav() {
    this.sidenav.toggle();

  }
  getMessage() {
    this.httpClient
      .doGet(
        'web-player/inbox-message/get-send-message-by-username/' + this.username
      )
      .subscribe((res) => {
        // this.listNotification = res.data
        this.postList = res.data;
        let backup = [];
        this.postList.forEach((res) => {
          if (res.status == 'UNREAD') {
            backup.push(res);
          }
        });
        this.postList = backup;
      });
    return this.postList;
  }

  checkLink() {
    let checkNoOne = 0;
    let gameBo = false;
    if (!this.isGame) {
      for (let index = 0; index < this.listLink.length; index++) {
        if (
          this.router.url.indexOf(this.listLink[index].link.toString()) >= 0
        ) {
          this.listLink[index].active = true;
          checkNoOne += 1;
          if (this.listLink[index].isGame) {
            // this.isGame = true     // REMOVE this comment for switch footbar
          }
        } else {
          this.listLink[index].active = false;
        }
      }
      if (checkNoOne == 0) {
        this.listLink[0].active = true;
        this.isGame = false;
      } else if (checkNoOne > 1) {
        this.listLink[0].active = false;
      }
    } else {
      for (let index = 0; index < this.listLinkForGame.length; index++) {
        if (this.router.url.indexOf('game') >= 0) {
          gameBo = true;
          // this.isGame = true     // REMOVE this comment for switch footbar
        }
        if (
          this.router.url.indexOf(
            this.listLinkForGame[index].link.toString()
          ) >= 0 &&
          this.listLinkForGame[index].link.toString() != '/'
        ) {
          this.listLinkForGame[index].active = true;
          checkNoOne += 1;
          break;
        } else {
          this.listLinkForGame[index].active = false;
        }
      }

      if (checkNoOne == 0) {
        this.listLinkForGame[0].active = true;
        if (gameBo) {
          // this.isGame = true     // REMOVE this comment for switch footbar
        } else {
          this.isGame = false;
        }
      } else if (checkNoOne > 1) {
        this.listLinkForGame[0].active = false;
      }
    }

    for (let index = 0; index < this.listSideNav.length; index++) {
      if (
        this.router.url.indexOf(this.listSideNav[index].link.toString()) >= 0
      ) {
        this.listSideNav[index].active = true;
      } else {
        this.listSideNav[index].active = false;
      }
    }
  }
  getMoney() {
    if (this.router.url.indexOf('/lottery/game-lotto') >= 0) {
      this.getMoneyLotto();
    } else {
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
  }
  getMoneyLotto() {
    this.httpClient
      .doGet('web-player/wallet/get-balance-lotto/' + this.username)
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
  openProfileBank() {
    this.router.navigate(['/profile/']);
  }
  goTo(idx) {
    let checkNoOne = 0;
    for (let index = 0; index < this.listLink.length; index++) {
      if (index == idx) {
        this.listLink[index].active = true;
        checkNoOne++;
      } else {
        this.listLink[index].active = false;
      }
    }
  }
  goToPath(path) {
    this.router.navigate([path]);
  }
  goToMessage(item) {
    this.router.navigate(['/user/user003-detail'], {
      queryParams: {
        subject: item.subject,
        promoTitle: item.promotion.promoTitle,
        createdDate: item.createdDate,
        webMessage: item.webMessage,
      },
    });
    this.httpClient
      .doPost('web-player/inbox-message/trigger-message', {
        username: this.username,
        messageCode: item.messageCode,
      })
      .subscribe((res) => {
        this.getMessage();
      });
  }
  goToForGame(idx) {
    let checkNoOne = 0;
    for (let index = 0; index < this.listLinkForGame.length; index++) {
      if (index == idx) {
        this.listLinkForGame[index].active = true;
        checkNoOne++;
      } else {
        this.listLinkForGame[index].active = false;
      }
    }
  }
  logout() {
    this.auth.logout();
  }

  openModal() {
    this.modalRef = this.modalService.show(this.showModal, {
      class: 'modal-dialog-centered',
    });
  }
  openModalAlert() {

    this.getMoney();
    this.modalRef = this.modalService.show(this.showAlertContirmText, {
      class: 'modal-dialog-centered',
    });
  }
  closeModal() {
    this.modalRef.hide();
  }

  routSandCode(data) {
    this.isSelect = true;
    this.selectData = data;
    // this.router.navigate(['/promotion/promotion-detail'], {
    //   queryParams: {
    //     promoCode: data.promoCode,
    //     promoBanner: data.promoBanner,
    //     promoDetail: data.promoDetail,
    //   }
    // });
  }

  routSandCode2() {
    this.isSelect = false;
  }

  sandPromotion() {
    this.httpClient
      .doPost('web-player/promotion-request/recive-promotion', {
        username: this.username,
        promoCode: this.selectData.promoCode,
      })
      .subscribe((res) => {
        this.modalRef.hide();
      });
  }
}
