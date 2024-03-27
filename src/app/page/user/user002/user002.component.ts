import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalPromotionsComponent } from 'src/app/component/modal/modal-promotions/modal-promotions.component';
import { HttpService } from 'src/app/service/http.service';
import { MessageService } from 'src/app/service/message.service';

interface user { }
@Component({
  selector: 'app-user002',
  templateUrl: './user002.component.html',
  styleUrls: ['./user002.component.css'],
})
export class User002Component implements OnInit {
  @ViewChild('showAlertSend', { static: true })
  showAlertSend: ModalPromotionsComponent;
  modalRef: BsModalRef;
  information: any = {
    affiliateCode: '',
    affiliateCodeUp: '',
    balance: '',
    bankAccount: '',
    bankCode: '',
    bankImg: '',
    bankNameEn: '',
    bankNameTh: '',
    bonus: '',
    createdBy: '',
    createdDate: '',
    enable: '',
    groupCode: '',
    groupLevelRes: '',
    groupLinkLine: '',
    groupMobilePhone: '',
    groupName: '',
    id: '',
    lastLoginDate: '',
    loginStatus: '',
    mobilePhone: '',
    pendingWithdrawal: '',
    realName: '',
    registerDate: '',
    tagCode: '',
    tagName: '',
    updatedBy: '',
    updatedDate: '',
    username: '',
  };
  username: any;
  money: any;
  mobilePhone: any;
  constructor(
    private httpClient: HttpService,
    private modalService: BsModalService
  ) {
    this.getMoney();
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.getData();
  }
  getMoney() {
    this.httpClient
      .doGet('web-player/wallet/get-balance/' + localStorage.getItem('username'))
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
  getData() {
    this.httpClient
      .doGet(
        'web-player/customer/get-customer-by-id/' +
        localStorage.getItem('username')
      )
      .subscribe((res) => {
        //console.log(res);
        this.information = res.data;
        this.mobilePhone = this.information.mobilePhone;
      });
  }

  openConfirm() {
    this.modalRef = this.modalService.show(this.showAlertSend, {
      class: 'modal-dialog-centered',
      backdrop: 'static',
    });
  }

  isSendFn(data) {
    if (data == true) {
      this.httpClient
        .doGet('web-player/player-contact/request-contact/' + this.information.username)
        .subscribe((res) => {
          if (MessageService.MSG.SUCCESS === res.status) {
            this.closeModal();
          } else {
            //console.log(res.data);
          }
        });
    } else if (data == false) {
      this.closeModal();
    }
  }

  closeModal() {
    this.modalRef.hide();
  }
}
