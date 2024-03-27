import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from 'src/app/common/layout/layout.component';
import { HttpService } from 'src/app/service/http.service';
import { listBank } from 'src/app/common/constant/bank-constant';
import { ViewChild } from '@angular/core';
import { ModalPromotionsComponent } from 'src/app/component/modal/modal-promotions/modal-promotions.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-bank002',
  templateUrl: './profile-bank002.component.html',
  styleUrls: ['./profile-bank002.component.css'],
})
export class ProfileBank002Component implements OnInit {
  @ViewChild('showAlertContirmText', { static: true })
  showAlertContirmText: ModalPromotionsComponent;

  url_img: string = './assets/image/bank/';
  url: any;
  textError: any;
  username: any;
  money: any = '0.00';
  number: any;
  text: any;
  bankAccount: any;
  accountName: any;
  bankName: any;
  isSucces: boolean = false;

  userRemark: any;
  isWithdraw: Boolean = false;
  turnOverData: any = {
    dateActive: null,
  };
  listUser = {
    bankCode: '',
    realName: '',
    bankAccount: '',
    bankNameTh: '',
    color: '#fff',
    color2: '#888888',
    src: '',
  };
  modalRef: any;
  constructor(
    private httpClient: HttpService,
    private layout: LayoutComponent,
    private modalService: BsModalService,
    private router: Router
  ) {
    this.layout.isMoney = false;
  }

  ngOnInit(): void {
    this.layout.getMoney();
    this.username = localStorage.getItem('username');
    this.getUser();
    this.getMoney();
    this.getTurnOver();
    this.getBank();
  }
  ngOnDestroy() {
    this.layout.isMoney = true;
  }

  isWithdrawFn() {
    this.isWithdraw = !this.isWithdraw;
    this.httpClient
      .doPost('web-player/withdraw/player-request', {
        bankAccount: this.bankAccount,
        accountName: this.bankName,
        bankName: this.accountName,
        amount: this.number,
        userRemark: this.userRemark,
      })
      .subscribe((res) => {
        if (res.message == 'NOT PASS WITHDRAW CONDITION') {
          this.textError = 'ไม่สามารถ คุณมียอดเทรินไม่ถึงกำหนด';
          this.openAlertContirmTextModal();
        } else {
          this.textError = 'ถอนเงินสำเร็จ';
          this.isSucces = true;
          this.openAlertContirmTextModal();
        }
      });
  }

  openAlertContirmTextModal() {
    this.modalRef = this.modalService.show(this.showAlertContirmText, {
      class: 'modal-dialog-centered',
    });
  }

  getTurnOver() {
    this.httpClient
      .doGet('web-player/customer/get-turnover-detail/' + this.username)
      .subscribe((res) => {
        this.turnOverData = res.data;
      });
  }

  getBank() {
    this.httpClient
      .doGet('web-player/company-account/get-random-row')
      .subscribe((res) => {
        this.bankAccount = res.data.bankAccount;
        this.accountName = res.data.accountName;
        this.bankName = res.data.bankCode;
      });
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
  closeModal() {
    this.modalRef.hide();
    if (this.isSucces) {
      this.layout.getMoney();
      this.router.navigate(['/main']);
    }
  }

  getUser() {
    this.httpClient
      .doGet('web-player/customer/get-customer-by-id/' + this.username)
      .subscribe((res) => {
        this.listUser.bankAccount = res.data.bankAccount;
        this.listUser.realName = res.data.realName;
        this.listUser.bankCode = res.data.bankCode;
        this.listUser.bankNameTh = res.data.bankNameTh;

        listBank.forEach((res) => {
          if (res.code == this.listUser.bankCode) {
            this.listUser.color = res.color;
            this.listUser.color2 = res.color2;
            this.listUser.src = res.src;
          }
        });

        // switch (res.data.bankCode) {
        //   case "UOB": {
        // this.url = this.url_img + "uob.png";
        //     break;
        //   }
        //   case "TCB": {
        //     this.url = this.url_img + "tanachai.png";
        //     break;
        //   }
        //   case "SDCT": {
        //     this.url = this.url_img + "tanachai.png";
        //     break;
        //   }
        //   case "GSB": {
        //     this.url = this.url_img + "onsin.png";
        //     break;
        //   }
        //   case "BAY": {
        //     this.url = this.url_img + "kongse.png";
        //     break;
        //   }
        //   case "KKP": {
        //     this.url = this.url_img + "k.png";
        //     break;
        //   }
        //   case "BBL": {
        //     this.url = this.url_img + "bankok.png";
        //     break;
        //   }
        //   case "KBANK": {

        //     this.url = this.url_img + "kasikron.png";
        //     break;
        //   }
        //   case "ICBC": {
        //     this.url = this.url_img + "cimb.png";
        //     break;
        //   }
        //   case "KTB": {
        //     this.url = this.url_img + "kongthai.png";
        //     break;
        //   }
        //   case "TMB": {
        //     this.url = this.url_img + "tmb.png";
        //     break;
        //   }
        //   case "SCB": {
        //     this.url = this.url_img + "scb.png";
        //     break;
        //   }
        //   default:
        //     this.url = "./assets/image/dead-image.png"
        // }
      });
  }
}
