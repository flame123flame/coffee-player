import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InputCalendarComponent } from '../../component/input/input-calendar/input-calendar.component';
import { HttpService } from 'src/app/service/http.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { listBank } from 'src/app/common/constant/bank-constant';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { ModalPromotionsComponent } from 'src/app/component/modal/modal-promotions/modal-promotions.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LayoutComponent } from 'src/app/common/layout/layout.component';
const URL = {
  GET_MONEY: 'web-player/wallet/get-balance/',
  GET_RANDOM: 'web-player/company-account/get-random-row/',
  GET_DEPOSIT_ORDER: 'web-player/deposit/get-deposit-order',
  SAVE_DEPOSIT: 'web-player/deposit/new-deposit',
};
interface bank {
  accountName?: String;
  balance?: any;
  bank?: String;
  bankAccount?: String;
  bankCode?: String;
  createdAt?: String;
  currDepositDaily?: any;
  currWithdrawDaily?: any;
  disable?: Boolean;
  displayName?: String;
  group?: String;
  groupCode?: String;
  id?: String;
  maxDeposit?: any;
  maxDepositDaily?: any;
  maxWithdrawDaily?: any;
  minDeposit?: any;
  updatedAt?: String;
  color?: String;
  color2?: String;
}
@Component({
  selector: 'app-deposit-money',
  templateUrl: './deposit-money.component.html',
  styleUrls: ['./deposit-money.component.css'],
})
export class DepositMoneyComponent implements OnInit {
  @ViewChild('showAlertContirmText1', { static: true })
  showAlertContirmText1: ModalPromotionsComponent;
  @ViewChild('showAlertContirmText2', { static: true })
  showAlertContirmText2: ModalPromotionsComponent;
  isSelect: Boolean = false;
  @ViewChild('calendarStart') calendarStart: InputCalendarComponent;
  @ViewChild('showModal', { static: true }) showModal: ModalPromotionsComponent;
  @ViewChild('showModal2', { static: true })
  showModal2: ModalPromotionsComponent;
  @ViewChild('showModal3', { static: true })
  showModal3: ModalPromotionsComponent;
  @ViewChild('roleModal', { static: true }) roleModal: ModalPromotionsComponent;
  @ViewChild('myDiv') myDiv: ElementRef;
  @ViewChild('showModalError', { static: true })
  showModalError: ModalPromotionsComponent;
  listDeposit: any[] = [
    'โอนเงินผ่านตู้เอทีเอ็ม',
    'โอนเงินผ่านเคาท์เตอร์ธนาคาร',
    'ฝากเงินผ่านตู้เอทีเอ็ม',
    'อื่น ๆ',
  ];
  imagesPreviewsSrc = null;
  // type: any = "เลือกวิธีการฝากเงิน";
  isshowCardMoney: Boolean = false;
  isshowButtonMoney: any;
  listPromotion: any[] = [];
  moneyTransfer: any;
  type: any;
  date: any;
  date2: any;
  companyAccountCode: any;
  number: any;
  depositOrder: any;
  formSave: FormGroup;
  imagePath: any;
  file: any;
  username: any;
  money: any = '0.00';
  imgBank: any;
  dateNow: any;
  isCheckNum: Boolean = false;
  bankData: bank = {
    accountName: '',
    balance: 0,
    bank: '',
    bankAccount: '',
    bankCode: '',
    createdAt: '',
    currDepositDaily: 0,
    currWithdrawDaily: 0,
    disable: false,
    displayName: '',
    group: null,
    groupCode: '',
    id: '',
    maxDeposit: 0,
    maxDepositDaily: 0,
    maxWithdrawDaily: 0,
    minDeposit: 0,
    updatedAt: '',
    color: '',
    color2: '',
  };
  bankAccount: any;
  realName: any;
  bankNameTh: any;
  alertText: any;
  selectData: any;
  isCopy: Boolean = false;
  isSuccess: Boolean = false;
  modalRef: BsModalRef;
  isAutoTap: Boolean = true;
  constructor(
    private modalService: BsModalService,
    public dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder,
    private httpClient: HttpService,
    private layout: LayoutComponent
  ) {
    this.formSave = this.formBuilder.group({
      type: [''],
      number: [''],
      depositDate: [''],
      file: [''],
      companyAccountId: [''],
      depositOrder: [''],
    });
    layout.isMoney = false;
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.layout.isMoney = true;
  }
  ngOnInit(): void {
    this.layout.getMoney();
    this.formSave.value.depositDate = moment(new Date()).format('DD-MM-YYYY');
    this.username = localStorage.getItem('username');
    // this.getMoney()
    this.transferStatus();
    this.getCredit();
    this.getOrder();
    this.getUser();
    this.dateNow = moment(new Date()).format('YYYY-MM-DDThh:mm:ss');
    this.getListPromotion();
    if (localStorage.getItem('CloseNever') != 'check') {
      this.modalRef = this.modalService.show(this.showAlertContirmText1, {
        class: 'modal-dialog-centered',
      });
    }
  }
  closeModal() {
    this.modalRef.hide();
  }
  openModal() {
    // this.layout.isModelShow = true
    this.modalRef = this.modalService.show(this.showModal, {
      class: 'modal-dialog-centered',
    });
  }
  openRoleModal() {
    // this.layout.isModelShow = true
    this.modalRef = this.modalService.show(this.roleModal, {
      class: 'modal-dialog-centered',
    });
  }

  hiddenShow(data) {
    localStorage.setItem('CloseNever', data);
  }

  copyText() {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.bankData.bankAccount.toString();
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.isCopy = true;
  }
  getUser() {
    this.httpClient
      .doGet('web-player/customer/get-customer-by-id/' + this.username)
      .subscribe((res) => {
        this.bankAccount = res.data.bankAccount;
        this.realName = res.data.realName;
        this.bankNameTh = res.data.bankNameTh;
      });
  }
  dateChange(e) {
    //console.log(e);
    this.formSave.value.depositDate = e;
    this.date = e;
  }
  getMoney() {
    this.httpClient.doGet(URL.GET_MONEY + this.username).subscribe((res) => {
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

  click() {
    //console.log(this.myDiv.nativeElement.innerHTML);
  }
  getCredit() {
    this.httpClient.doGet(URL.GET_RANDOM + this.username).subscribe((res) => {
      this.companyAccountCode = res.data.companyAccountCode;
      this.bankData = res.data;
      let text = '';
      for (let index = 0; index < this.bankData.bankAccount.length; index++) {
        if (index % 3 == 0 && index != 0) {
          text += '-' + this.bankData.bankAccount[index];
        } else {
          text += this.bankData.bankAccount[index];
        }
      }
      this.bankData.bankAccount = text;
      listBank.forEach((res) => {
        if (res.code == this.bankData.bankCode) {
          this.bankData.color = res.color;
          this.bankData.color2 = res.color2;
          this.imgBank = res.src;
        }
      });

      // listBank.forEach(res => {
      //   if (res.code == this.listUser.bankCode) {

      //     this.listUser.src = res.src
      //   }
      // })
      // })
      this.bankData.minDeposit = Number(
        this.bankData.minDeposit
      ).toLocaleString();
      this.bankData.maxDepositDaily = Number(
        this.bankData.maxDepositDaily
      ).toLocaleString();
    });
  }
  getOrder() {
    this.httpClient.doGet(URL.GET_DEPOSIT_ORDER).subscribe((res) => {
      this.depositOrder = res.data;

      this.formSave.value.type = this.listDeposit[0];
    });
  }
  getListPromotion() {
    this.httpClient
      .doGet('web-player/promotion/get-promotion-player')
      .subscribe((res) => {
        this.listPromotion = res.data;
        this.isSelect = false;
      });
  }

  routSandCode2() {
    this.isSelect = false;
  }

  openmodal2() {
    this.modalRef = this.modalService.show(this.showModal2, {
      class: 'modal-dialog-centered',
    });
  }

  openmodal3() {
    this.modalRef = this.modalService.show(this.showAlertContirmText2, {
      class: 'modal-dialog-centered',
    });
  }

  openmodal4() {
    this.modalRef = this.modalService.show(this.showModal2, {
      class: 'modal-dialog-centered',
    });
  }

  postDeposit() {
    var x = this.isAutoTap
      ? new Date()
      : (<HTMLInputElement>document.getElementById('myDate')).value;
    let date = moment(x).format('YYYY-MM-DD hh:mm');
    this.date = date;
    if (
      (Number(this.bankData.maxDepositDaily.replace(/,/g, '')) <
        Number(this.number) ||
        Number(this.bankData.minDeposit.replace(/,/g, '')) >
          Number(this.number) ||
        this.number == null) &&
      !this.isAutoTap
    ) {
      this.isCheckNum = true;
    } else {
      this.httpClient
        .doPost(URL.SAVE_DEPOSIT, {
          depositOrder: this.depositOrder,
          username: this.username,
          companyAccountCode: this.companyAccountCode,
          depositType: this.type,
          amount: this.number ?? 0,
          depositDate: this.date,
          slip: null,
        })
        .subscribe((res) => {
          if (res.status == 'SUCCESS') {
            this.isSuccess = true;
            this.alertText = 'ทำรายการเรียบร้อย';
            this.router.navigate(['/']);
          } else {
            this.alertText = res.message;
            this.isSuccess = false;
          }
          this.openModal();
        });
    }
  }

  transferStatus() {
    this.httpClient
      .doGet('web-player/deposit-setting/deposit-system/' + this.username)
      .subscribe((res) => {
        let data = 'CLOSED';
        // res.data.serverStatus
        switch (res.data.serverStatus) {
          case 'MANUAL':
            this.isshowCardMoney = true;
            this.isAutoTap = false;
            if (res.data.userStatus == 'ACCESS') {
              // ACCESS
            } else if (res.data.userStatus == 'CONDITION') {
              this.isshowButtonMoney = res.data.wording;
            } else {
              // REJECT
              this.isshowButtonMoney =
                'โปรดรอสักครู่ เจ้าหน้าที่กำลังยืนยันข้อมูลบัญชีธนาคารที่คุณใช้ลงทะเบียนเข้ามา (หากข้อความนี้ยังแสดงอยู่หลังจากที่สมัครเข้ามาเกิน5นาที กรุณาติดต่อเจ้าหน้าที่)';
              this.isshowCardMoney = false;
            }
            break;
          case 'AUTO':
            this.isshowCardMoney = true;
            this.isAutoTap = false;
            if (res.data.userStatus == 'ACCESS') {
              // ACCESS
            } else {
              // REJECT
              this.isshowButtonMoney =
                'โปรดรอสักครู่ เจ้าหน้าที่กำลังยืนยันข้อมูลบัญชีธนาคารที่คุณใช้ลงทะเบียนเข้ามา (หากข้อความนี้ยังแสดงอยู่หลังจากที่สมัครเข้ามาเกิน5นาที กรุณาติดต่อเจ้าหน้าที่)';
              this.isshowCardMoney = false;
            }
            break;
          case 'CLOSED':
            this.isshowButtonMoney = 'ขออภัยระบบการเติมเงินปิดชั่วคราว';
            this.isshowCardMoney = false;
            break;
          default:
            break;
        }
      });
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
    // this.modalRef.hide()
  }

  sandPromotion() {
    this.httpClient
      .doPost('web-player/promotion-request/recive-promotion', {
        username: this.username,
        promoCode: this.selectData.promoCode,
      })
      .subscribe((res) => {
        this.getListPromotion();
        this.modalRef.hide();
      });
  }

  async onSelectPreviweFile(event) {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size >= 1048576) {
        // this.modalError.openModal(`ไฟล์เกิน 10 MB ไม่สามารถอัพโหลดได้`);
        return;
      }
      const reader = new FileReader();
      reader.onload = (onload: any) => {
        this.imagesPreviewsSrc = onload.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.file = event.target.files[0];
    }
    const img = new FormData();
    img.append('image', this.file);
    // const resFile = await this.httpClient.doPost('company-structure/upload-image-company', img);
    // this.imagePath = resFile.data;
  }
}
