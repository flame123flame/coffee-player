import { Component, Directive, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {
  GOVERNMENT,
  THAI,
  STOCKS,
  CLOSE_NUMBER,
  _1DIGIT_TOP,
  DOOR_19,
  DOUBLE,
  FRONT,
  BACK,
  LOWER,
  UPPER,
  EVEN,
  ODD,
  _3DIGIT_BOT,
  _2DIGIT_TOP,
  _3DIGIT_FRONT,
  _3DIGIT_SWAPPED,
  _3DIGIT_TOP,
  _2DIGIT_BOT,
  _1DIGIT_BOT,
  OVER_MAX_RISK,
  HAS_NEW_LIMIT,
  OVER_MAX_PER_USER, OVER_MAX_PER_TRANS,
  government,
  BUY_TIME_OUT,
  stocks,
} from 'src/app/common/constant/lotto-constant';
import { LayoutComponent } from 'src/app/common/layout/layout.component';
import { ModalPromotionsComponent } from 'src/app/component/modal/modal-promotions/modal-promotions.component';
import { HttpService } from 'src/app/service/http.service';
import { GameLotteryComponent } from '../game-lottery.component';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import { imgApi } from 'src/app/common/constant/contants';
declare const SockJS;
declare const Stomp;

// https://finnbet.com/COFFEE-FILE/api/img/get-img?path=lottoruleimage/THG-232139410320400zkbimhydym.jpg
@Component({
  selector: 'app-game-lotto001',
  templateUrl: './game-lotto001.component.html',
  styleUrls: ['./game-lotto001.component.css'],
})

export class GameLotto001Component implements OnInit {
  @Directive({ selector: 'img' })
  @ViewChild('num1') num1Ref: ElementRef;
  @ViewChild('num2') num2Ref: ElementRef;
  @ViewChild('num3') num3Ref: ElementRef;
  @ViewChild('showModal', { static: true }) showModal: ModalPromotionsComponent;
  @ViewChild('showAlertModal', { static: true })
  showAlertModal: ModalPromotionsComponent;
  @ViewChild('showAlertContirmText', { static: true })
  showAlertContirmText: ModalPromotionsComponent;
  @ViewChild('showAlertDelete', { static: true })
  showAlertDelete: ModalPromotionsComponent;
  @ViewChild('showContirmBuy', { static: true })
  showContirmBuy: ModalPromotionsComponent;
  @ViewChild('showBillModal', { static: true })
  showBillModal: ModalPromotionsComponent;
  @ViewChild('showPoyModal', { static: true })
  showPoyModal: ModalPromotionsComponent;
  modalRef: BsModalRef;
  imgApi: any = imgApi
  alerts: any[] = [];
  isBuyError: any = {
    outOffBalance: null,
    serverBuyFail: null,
    success: null,
    lottoTransactionGroupCode: null,
  };
  listType: any[] = [
    { group: 'สามตัว', color: '#FF7E00 ', active: false },
    { group: 'สองตัว', color: '#3168F0', active: false },
    { group: 'เลขวิ่ง', color: '#00E38D', active: false },
  ];

  listRange: any[] = [
    {
      code: '_3DIGI',
      range: [
        { text: '000', active: false, isShow: true },
        { text: '100', active: false, isShow: true },
        { text: '200', active: false, isShow: true },
        { text: '300', active: false, isShow: true },
        { text: '400', active: false, isShow: true },
        { text: '500', active: false, isShow: true },
        { text: '600', active: false, isShow: true },
        { text: '700', active: false, isShow: true },
        { text: '800', active: false, isShow: true },
        { text: '900', active: false, isShow: true },
      ],
    },
    {
      code: '_2DIGI',
      range: [{ text: '00', active: false, isShow: false }],
    },
    {
      code: '_1DIGI',
      range: [{ text: '0', active: false, isShow: false }],
    },
  ];
  list19: any[] = [
    { text: 0, active: false },
    { text: 1, active: false },
    { text: 2, active: false },
    { text: 3, active: false },
    { text: 4, active: false },
    { text: 5, active: false },
    { text: 6, active: false },
    { text: 7, active: false },
    { text: 8, active: false },
    { text: 9, active: false },
  ];
  listSwipeFront: any[] = [
    { text: 0, active: false },
    { text: 1, active: false },
    { text: 2, active: false },
    { text: 3, active: false },
    { text: 4, active: false },
    { text: 5, active: false },
    { text: 6, active: false },
    { text: 7, active: false },
    { text: 8, active: false },
    { text: 9, active: false },
  ];
  listSwipeBack: any[] = [
    { text: 0, active: false },
    { text: 1, active: false },
    { text: 2, active: false },
    { text: 3, active: false },
    { text: 4, active: false },
    { text: 5, active: false },
    { text: 6, active: false },
    { text: 7, active: false },
    { text: 8, active: false },
    { text: 9, active: false },
  ];

  list192: any[] = [
    { text: 0, active: false },
    { text: 1, active: false },
    { text: 2, active: false },
    { text: 3, active: false },
    { text: 4, active: false },
    { text: 5, active: false },
    { text: 6, active: false },
    { text: 7, active: false },
    { text: 8, active: false },
    { text: 9, active: false },
  ];
  listSwipeFront2: any[] = [
    { text: 0, active: false },
    { text: 1, active: false },
    { text: 2, active: false },
    { text: 3, active: false },
    { text: 4, active: false },
    { text: 5, active: false },
    { text: 6, active: false },
    { text: 7, active: false },
    { text: 8, active: false },
    { text: 9, active: false },
  ];
  listSwipeBack2: any[] = [
    { text: 0, active: false },
    { text: 1, active: false },
    { text: 2, active: false },
    { text: 3, active: false },
    { text: 4, active: false },
    { text: 5, active: false },
    { text: 6, active: false },
    { text: 7, active: false },
    { text: 8, active: false },
    { text: 9, active: false },
  ];
  listData: any[] = [
    {
      lottoName: 'สามตัวบน',
      active: false,
      code: _3DIGIT_TOP.code,
      multi: 0,
      max: 0,
      min: 0,
      maxNum: 0,
      color: '#A8BBF7 ',
      digi: 3,
      group: this.listType[0].group,
      range: this.listRange[0],
      isSwitch: false,
    },
    {
      lottoName: 'สามตัวโต๊ด',
      active: false,
      code: _3DIGIT_SWAPPED.code,
      multi: 0,
      max: 0,
      min: 0,
      maxNum: 0,
      color: '#A8BBF7',
      digi: 3,
      group: this.listType[0].group,
      range: this.listRange[0],
      isSwitch: false,
    },
    {
      lottoName: 'สามตัวหน้า',
      active: false,
      code: _3DIGIT_FRONT.code,
      multi: 0,
      max: 0,
      min: 0,
      maxNum: 0,
      color: '#A8BBF7',
      digi: 3,
      group: this.listType[0].group,
      range: this.listRange[0],
      isSwitch: false,
    },
    {
      lottoName: 'สามตัวล่าง',
      active: false,
      code: _3DIGIT_BOT.code,
      multi: 0,
      max: 0,
      min: 0,
      maxNum: 0,
      color: '#A8BBF7',
      digi: 3,
      group: this.listType[0].group,
      range: this.listRange[0],
      isSwitch: false,
    },
    {
      lottoName: 'สองตัวบน',
      active: false,
      code: _2DIGIT_TOP.code,
      multi: 0,
      max: 0,
      maxNum: 0,
      min: 0,
      color: '#FBAB75',
      digi: 2,
      group: this.listType[1].group,
      range: this.listRange[1],
      isSwitch: false,
      list19: this.list19,
      listSwipeFront: this.listSwipeFront,
      listSwipeBack: this.listSwipeBack,
    },
    {
      lottoName: 'สองตัวล่าง',
      active: false,
      code: _2DIGIT_BOT.code,
      multi: 0,
      max: 0,
      min: 0,
      maxNum: 0,
      color: '#FBAB75',
      digi: 2,
      group: this.listType[1].group,
      range: this.listRange[1],
      isSwitch: false,
      list19: this.list192,
      listSwipeFront: this.listSwipeFront2,
      listSwipeBack: this.listSwipeBack2,
    },
    {
      lottoName: '+ กลับสามตัว',
      active: false,
      code: _3DIGIT_TOP.code,
      multi: 0,
      max: 0,
      min: 0,
      maxNum: 0,
      color: '#A8BBF7',
      digi: 3,
      group: this.listType[0].group,
      range: this.listRange[0],
      isSwitch: true,
    },
    {
      lottoName: '+ กลับสองตัว',
      active: false,
      code: _2DIGIT_TOP.code,
      multi: 0,
      max: 0,
      min: 0,
      maxNum: 0,
      color: '#FBAB75',
      digi: 2,
      group: this.listType[1].group,
      range: this.listRange[1],
      isSwitch: true,
    },
    {
      lottoName: 'วิ่งบน',
      active: false,
      code: _1DIGIT_TOP.code,
      multi: 0,
      max: 0,
      min: 0,
      maxNum: 0,
      color: '#7DDEAB',
      digi: 1,
      group: this.listType[2].group,
      range: this.listRange[2],
      isSwitch: false,
    },
    {
      lottoName: 'วิ่งล่าง',
      active: false,
      code: _1DIGIT_BOT.code,
      multi: 0,
      max: 0,
      min: 0,
      maxNum: 0,
      color: '#7DDEAB',
      digi: 1,
      group: this.listType[2].group,
      range: this.listRange[2],
      isSwitch: false,
    },
  ];
  listType2Digit: any[] = [
    { text: '19 ประตู', code: DOOR_19, active: false, isNeedInput: true },
    { text: 'เลขเบิ้ล', code: DOUBLE, active: false, isNeedInput: false },
    { text: 'รูดหน้า', code: FRONT, active: false, isNeedInput: true },
    { text: 'รูดหลัง', code: BACK, active: false, isNeedInput: true },
    { text: 'สองตัวต่ำ', code: LOWER, active: false, isNeedInput: false },
    { text: 'สองตัวบน', code: UPPER, active: false, isNeedInput: false },
    { text: 'สองตัวคู่', code: EVEN, active: false, isNeedInput: false },
    { text: 'สองตัวคี่', code: ODD, active: false, isNeedInput: false },
  ];
  rankImg: any;
  lottoTransactionGroupCode: any;
  numPlay: Number = 0;
  numPlayTotal: Number = 0;
  listMoney: any[] = [5, 10, 20, 50, 100];
  listPoy: any[] = [];
  listPushPoy: any[] = [];
  listPoyDetail: any[] = [];
  listError: any[] = [];
  isSwitch: Boolean = false;
  isSuccess: Boolean = false;
  isComfirm: Boolean = false;
  isDelete: any = {
    active: false,
    text: '',
    index: '',
    type: '',
    list100: [],
  };
  is2digit: Boolean = false;
  is2digitType: Boolean = false;
  itemSelect: any;
  showAlertContirmTextStr: any = {
    text: '',
    status: '',
  };
  fnBackup: void;
  isGovernment: Boolean = false;
  isThai: Boolean = false;
  listDataDupp: any[] = [];
  listNumberInput: any[] = ['', '', ''];
  alertText: any;
  noSelectText: String = "ไม่มีรายการแทง"
  coustAddSelect: any = 0;
  coustAddSelectBackup: any = 0;
  type: any = 0;
  typeIndexData: any = 0;
  list100: any[] = [];
  list100Select: any[] = [];
  list100SelectBackup: any[] = [];
  list100SelectBackupDelete: any[] = [];
  listNumOver: any[] = [];
  listNumClose: any[] = [];
  dataSaveBackup: any;
  listErrorCheck: any[] = [
    { code: OVER_MAX_PER_TRANS, text: 'หมายเลขการซื้อเกินจำนวนสูงสุดต่อโพย' },
    { code: OVER_MAX_PER_USER, text: 'หมายเลขการซื้อเกินจำนวนสูงสุดต่อผู้ใช้' },
    { code: OVER_MAX_RISK, text: 'เลขการซื้อเกินอัตตราปิดรับ' },
    { code: CLOSE_NUMBER, text: 'หมายเลขการซื้อมีการปิดรับแทงแล้ว' },
    {
      code: HAS_NEW_LIMIT,
      text: 'อัตราจ่ายของรายการที่ท่านเลือกมีการเปลี่ยนแปลง',
    },
  ];
  HAS_NEW_LIMIT = HAS_NEW_LIMIT;
  OVER_MAX_PER_TRANS = OVER_MAX_PER_TRANS;
  OVER_MAX_PER_USER = OVER_MAX_PER_USER;
  OVER_MAX_RISK = OVER_MAX_RISK;
  CLOSE_NUMBER = CLOSE_NUMBER;
  listComfirm: any[] = [];
  listErrorData: any[] = [];
  typeSelect: any[] = [];
  typeSelectText: any[] = [];
  isFinger: Boolean[] = [true, false];
  isPoy: Boolean[] = [true, false];
  isBuySuccess: Boolean = false;
  lottoData: any;
  dateNow: any;
  username: any;
  dateClose: any;
  active100: Boolean = false;
  money: any = 0;
  numSearchText: any = '';
  isNumSearchText: Boolean = false;
  stompClient: any;
  codeText: any;
  code: any;
  typeNumber: any = 0;
  digi: any = 0;
  sumBet: any;
  sumPrizeWin: any;
  constructor(
    private modalService: BsModalService,
    private httpClient: HttpService,
    private gameLotto: GameLotteryComponent,
    private router: Router,
    private layout: LayoutComponent,
    private route: ActivatedRoute,
    { nativeElement }: ElementRef<HTMLImageElement>
  ) {
    this.code = this.route.snapshot.queryParams['code'];
    this.isThai = this.code == THAI ? true : false
    this.isGovernment =
      this.route.snapshot.queryParams['type'] == government ? true : false;
    const serverUrl = environment.LOTTO_URL + '/socket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const supports = 'loading' in HTMLImageElement.prototype;
    if (supports) {
      nativeElement.setAttribute('loading', 'lazy');
    }
  }
  ngOnDestroy(): void {
    this.gameLotto.isSelect = false;
    this.layout.isCurveL = true;
    this.layout.isHeader = true;
    this.layout.isMoney = true;
  }
  ngOnInit(): void {
    //console.log(this.router.url);

    this.money = this.layout.money;
    this.layout.isCurveL = false;
    // this.layout.isHeader = false
    this.layout.isMoney = false;
    this.username = localStorage.getItem('username');
    if (!this.isGovernment || !this.isThai) {
      this.isNotGovernmentFn();
    }
    this.getUser();
    this.set100Fn();
    this.getLotto();
    this.getLottoClose();
    this.dateNow = new Date();
    // this.typeSelect.push(this.listData[0])
    this.itemSelect = this.listData[0];
    this.stompClient.connect(
      // this.headerSend,
      // { "Access-Control-Allow-Origin": "*" },
      // 'EmEm',
      this.username,
      'password',
      (frame) => {
        this.stompClient.debug('connected LOTTO  to Socket!!!');
        this.subscribePost();
        this.subscribeCloseNum();
      },
      (error) => {
        //console.log('when error', error);
      },
      (closeEvent) => {
        //console.log('when closeEvent', closeEvent);
      }
    );
  }
  public subscribePost() {
    this.stompClient.subscribe('/limit/' + this.code, (message) => {
      if (message.body) {
        this.listNumOver = JSON.parse(message.body);
        this.openBillModal(false);
      }
    });
  }
  public subscribeCloseNum() {
    this.stompClient.subscribe('/closeNumber/' + this.code, (message) => {
      if (message.body) {
        this.listNumClose = JSON.parse(message.body);
      }
    });
  }
  ngDoCheck() {
    if (this.coustAddSelect > 0) {
      this.addAlert(1);
    } else if (this.coustAddSelect < 0) {
      this.addAlert(2);
    }
    this.coustAddSelect = 0;
  }
  isNotGovernmentFn() {
    let arr = [];
    this.listData.forEach((res) => {
      if (res.code != _3DIGIT_FRONT.code && res.code != _3DIGIT_BOT.code) {
        arr.push(res);
      }
    });
    this.listData = arr;
  }
  addAlert(status: Number) {
    this.alerts = [];
    if (status == 1) {
      this.alerts.push({
        isSuccess: true,
        type: 'success',
        msg: `เพิ่มรายการแทงล่าสุด ` + this.coustAddSelect + ` รายการ`,
        timeout: 2000,
      });
    } else if (status == 2) {
      this.alerts.push({
        isSuccess: false,
        type: 'success',
        msg: `ลบรายการแทงล่าสุด ` + this.coustAddSelect * -1 + ` รายการ`,
        timeout: 2000,
      });
    } else if (status == 99) {
      this.alerts.push({
        isSuccess: false,
        type: 'success',
        msg: `ล้างข้อมูลเรียบร้อย`,
        timeout: 2000,
      });
    }
  }
  back() {
    this.router.navigate(['/lottery/game-lotto']);
  }
  getUser() {
    this.httpClient
      .doGet('web-player/customer/get-customer-by-id/' + this.username)
      .subscribe((res) => {
        this.rankImg = res.data.groupImg;
      });
  }
  goToPath(path, isOpening) {
    this.router.navigate([path], {
      queryParams: { code: this.lottoTransactionGroupCode,lottoClassName:this.lottoData?.className },
    });

    if (isOpening) {
      this.closeAllModal();
    }
  }
  type2digitFn(item, index) {
    this.listData.forEach((res) => {
      if (res.active && res.isSwitch) {
        res.active = false;
      }
    });
    if (item.isNeedInput) {
      this.listType2Digit[index].active = !this.listType2Digit[index].active;
      this.is2digitType = false;
      this.listType2Digit.forEach((res) => {
        if (res.active) {
          this.is2digitType = true;
        }
      });
    } else {
      if (item.code == DOUBLE) {
        this.selectDoubleFn();
      } else if (item.code == LOWER) {
        this.selectLowerFn();
      } else if (item.code == UPPER) {
        this.selectUpperFn();
      } else if (item.code == EVEN) {
        this.selectEvenFn();
      } else if (item.code == ODD) {
        this.selectOddFn();
      }
      setTimeout(() => {
        this.listType2Digit[index].active = !this.listType2Digit[index].active;
      }, 250);
      this.listType2Digit[index].active = !this.listType2Digit[index].active;
    }
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
  isSwitchFn(Boo) {
    this.isSwitch = Boo;
  }
  isPoyFn(index) {
    this.isPoy.forEach((res, idx) => {
      this.isPoy[idx] = false;
    });
    this.isPoy[index] = true;
  }
  switchSideNav() {
    this.layout.switchSideNav();
  }
  activeRange1000Fn(index, item) {
    let count = this.list100Select.length;
    if (this.active100 && !item.isClose) {
      this.list100[index].active = !this.list100[index].active;
      if (item.active) {
        this.listData.forEach((res) => {
          if (res.active && !res.isSwitch) {
            if (this.isSwitch) {
              this.swichNum(item.text);
            } else {
              item = {
                active: true,
                code: res.code,
                isSwitch: false,
                max: res.max,
                maxNum: res.maxNum,
                min: res.min,
                num: res.min,
                text: this.list100[index].text,
                total: res.multi,
                type: res.lottoName,
              };
              let isDupp = false;
              this.list100Select.forEach((data) => {
                if (item.code == data.code && item.text == data.text) {
                  isDupp = true;
                }
              });
              if (!isDupp) {
                this.list100Select.push(item);
              }
            }
          }
        });
      } else {
        this.list100SelectBackup = [].concat(this.list100Select);
        this.isDelete.type = 'one';
        this.list100[index].active = true;
        this.isDelete.active = true;
        this.isDelete.list100 = [];
        this.isDelete.list100.push(index);
        for (let idx = 0; idx < this.list100Select.length; idx++) {
          if (this.list100Select[idx].text == this.list100[index].text) {
            this.listData.forEach((data) => {
              if (
                data.active &&
                !data.isSwitch &&
                this.list100Select[idx].code == data.code
              ) {
                this.list100Select.splice(idx, 1);
              }
            });
          }
        }
        //console.log(this.isDelete.list100);

        this.openAlertDelete2(
          `การกดแทงเลขที่เคยแทงแล้ว จะเป็นการยกเลิกการแทงเลขนั้นๆ. คุณต้องการยกเลิก เลข ${item.text} ใช้หรอไม่ใช้ `
        );
      }
    }
    let arr = [];
    for (let index = 0; index < this.list100Select.length; index++) {
      for (let idx = 0; idx < this.listNumClose.length; idx++) {
        if (this.listNumClose[idx].kindCode == this.list100Select[index].code) {
          for (
            let i = 0;
            i < this.listNumClose[idx].listCloseNumber.length;
            i++
          ) {
            if (
              this.listNumClose[idx].listCloseNumber[i].lottoNumber ==
              this.list100Select[index].text
            ) {
              arr.push(index);
              break;
            }
          }
        }
      }
    }
    let reverseArr = arr.slice().reverse();
    reverseArr.forEach((res) => {
      this.list100Select.splice(res, 1);
    });
    if (this.isDelete.active) {
      this.list100SelectBackupDelete = [];
      this.list100SelectBackupDelete = this.list100SelectBackupDelete.concat(
        this.list100Select
      );
      this.coustAddSelectBackup = this.list100Select.length - count;
      this.list100Select = this.list100SelectBackup;
    } else {
      this.coustAddSelect = this.list100Select.length - count;
    }
  }
  isDeleteFn(boo) {
    if (boo) {
      this.coustAddSelect = this.coustAddSelectBackup;
      this.list100Select = this.list100SelectBackupDelete;
      switch (this.isDelete.type) {
        case '19':
          this.itemSelect.list19[this.isDelete.index].active = false;
          break;
        case 'SwipeFront':
          this.itemSelect.listSwipeFront[this.isDelete.index].active = false;
          break;
        case 'SwipeBack':
          this.itemSelect.listSwipeBack[this.isDelete.index].active = false;
          break;
        case 'one':
          break;
        default:
          break;
      }

      this.list100.forEach((res, jdex) => {
        for (let index = 0; index < this.isDelete.list100.length; index++) {
          if (this.isDelete.list100[index] == jdex) {
            res.active = false;
          }
        }
      });
    }
    this.isDelete.active = false;
    this.closeModal();
  }
  select19Fn(number) {
    let count = this.list100Select.length;
    let index;
    this.itemSelect.list19.forEach((element, idx) => {
      if (element.text.toString() == number.toString()) {
        index = idx;
      }
    });
    this.itemSelect.list19[index].active = !this.itemSelect.list19[index]
      .active;
    let isDeleteOne = false;
    if (!this.itemSelect.list19[index].active) {
      isDeleteOne = true;
      this.isDelete.active = true;
      this.isDelete.index = index;
      this.isDelete.list100 = [];
      this.list100SelectBackup = [];
      this.list100SelectBackup = this.list100SelectBackup.concat(
        this.list100Select
      );
      this.itemSelect.list19[index].active = true;
      this.listType2Digit.forEach((res) => {
        if (res.code == DOOR_19) {
          res.active = true;
        } else {
          res.active = false;
        }
      });
      this.isDelete.type = '19';
      this.openAlertDelete(
        `การกดแทงเลขที่เคยแทงแล้ว จะเป็นการยกเลิกการแทงเลขนั้นๆ. คุณต้องการยกเลิก 19 ประตู เลข ${number} ใช้หรอไม่ใช้ `
      );
    }
    this.list100.forEach((res, hdex) => {
      if (res.text.indexOf(this.itemSelect.list19[index].text) >= 0) {
        if (!this.isDelete.active) {
          for (let idx = 0; idx < this.list100Select.length; idx++) {
            if (this.list100Select[idx].text == res.text) {
              this.listData.forEach((data) => {
                if (
                  data.active &&
                  !data.isSwitch &&
                  this.list100Select[idx].code == data.code
                ) {
                  this.list100Select.splice(idx, 1);
                }
              });
            }
          }
          res.active = true;
          this.listData.forEach((data) => {
            if (data.active && !data.isSwitch) {
              this.list100Select.push({
                text: res.text,
                active: true,
                code: data.code,
                isSwitch: data.isSwitch,
                max: data.max,
                maxNum: data.maxNum,
                min: data.min,
                num: data.min,
                total: data.multi,
                type: data.lottoName,
              });
            }
          });
        } else {
          if (isDeleteOne) {
            this.isDelete.list100.push(hdex);
          } else {
            res.active = false;
          }
          let numArray = [];
          for (let idx = 0; idx < this.list100Select.length; idx++) {
            this.listData.forEach((data) => {
              if (
                res.text == this.list100Select[idx].text &&
                data.active &&
                !data.isSwitch &&
                this.list100Select[idx].code == data.code
              ) {
                numArray.push(idx);
              }
            });
          }
          numArray = numArray.slice().reverse();
          for (let i = 0; i < numArray.length; i++) {
            this.list100Select.splice(numArray[i], 1);
          }
        }
      }
    });
    if (this.isDelete.active) {
      this.list100SelectBackupDelete = [];
      this.list100SelectBackupDelete = this.list100SelectBackupDelete.concat(
        this.list100Select
      );
      this.coustAddSelectBackup = this.list100Select.length - count;
      this.list100Select = this.list100SelectBackup;
    } else {
      this.coustAddSelect = this.list100Select.length - count;
    }
  }
  selectSwipeFrontFn(number) {
    let count = this.list100Select.length;
    let index;
    this.itemSelect.list19.forEach((element, idx) => {
      if (element.text.toString() == number.toString()) {
        index = idx;
      }
    });
    this.itemSelect.listSwipeFront[index].active = !this.itemSelect
      .listSwipeFront[index].active;
    let isDeleteOne = false;
    if (!this.itemSelect.listSwipeFront[index].active) {
      isDeleteOne = true;
      this.isDelete.active = true;
      this.isDelete.index = index;
      this.isDelete.list100 = [];
      this.list100SelectBackup = [];
      this.list100SelectBackup = this.list100SelectBackup.concat(
        this.list100Select
      );
      this.itemSelect.listSwipeFront[index].active = true;
      this.listType2Digit.forEach((res) => {
        if (res.code == FRONT) {
          res.active = true;
        } else {
          res.active = false;
        }
      });
      this.isDelete.type = 'SwipeFront';
      this.openAlertDelete(
        `การกดแทงเลขที่เคยแทงแล้ว จะเป็นการยกเลิกการแทงเลขนั้นๆ. คุณต้องการยกเลิก รูดหน้า เลข ${number} ใช้หรอไม่ใช้ `
      );
    }
    this.list100.forEach((res, hdex) => {
      if (
        res.text[0].indexOf(this.itemSelect.listSwipeFront[index].text) >= 0
      ) {
        if (!this.isDelete.active) {
          for (let idx = 0; idx < this.list100Select.length; idx++) {
            if (this.list100Select[idx].text == res.text) {
              this.listData.forEach((data) => {
                if (
                  data.active &&
                  !data.isSwitch &&
                  this.list100Select[idx].code == data.code
                ) {
                  this.list100Select.splice(idx, 1);
                }
              });
            }
          }
          res.active = true;
          this.listData.forEach((data) => {
            if (data.active && !data.isSwitch) {
              this.list100Select.push({
                text: res.text,
                active: true,
                code: data.code,
                isSwitch: data.isSwitch,
                max: data.max,
                maxNum: data.maxNum,
                min: data.min,
                num: data.min,
                total: data.multi,
                type: data.lottoName,
              });
            }
          });
        } else {
          if (isDeleteOne) {
            this.isDelete.list100.push(hdex);
          } else {
            res.active = false;
          }
          let numArray = [];
          for (let idx = 0; idx < this.list100Select.length; idx++) {
            this.listData.forEach((data) => {
              if (
                res.text == this.list100Select[idx].text &&
                data.active &&
                !data.isSwitch &&
                this.list100Select[idx].code == data.code
              ) {
                numArray.push(idx);
              }
            });
          }
          numArray = numArray.slice().reverse();
          for (let i = 0; i < numArray.length; i++) {
            this.list100Select.splice(numArray[i], 1);
          }
        }
      }
    });
    if (this.isDelete.active) {
      this.list100SelectBackupDelete = [];
      this.list100SelectBackupDelete = this.list100SelectBackupDelete.concat(
        this.list100Select
      );
      this.coustAddSelectBackup = this.list100Select.length - count;
      this.list100Select = this.list100SelectBackup;
    } else {
      this.coustAddSelect = this.list100Select.length - count;
    }
  }

  selectSwipeBackFn(number) {
    let count = this.list100Select.length;
    let index;
    this.itemSelect.list19.forEach((element, idx) => {
      if (element.text.toString() == number.toString()) {
        index = idx;
      }
    });
    this.itemSelect.listSwipeBack[index].active = !this.itemSelect
      .listSwipeBack[index].active;
    let isDeleteOne = false;
    if (!this.itemSelect.listSwipeBack[index].active) {
      this.isDelete.active = true;
      this.isDelete.index = index;
      isDeleteOne = true;
      this.isDelete.list100 = [];
      this.list100SelectBackup = [];
      this.list100SelectBackup = this.list100SelectBackup.concat(
        this.list100Select
      );
      this.itemSelect.listSwipeBack[index].active = true;
      this.listType2Digit.forEach((res) => {
        if (res.code == BACK) {
          res.active = true;
        } else {
          res.active = false;
        }
      });
      this.isDelete.type = 'SwipeBack';
      this.openAlertDelete(
        `การกดแทงเลขที่เคยแทงแล้ว จะเป็นการยกเลิกการแทงเลขนั้นๆ. คุณต้องการยกเลิก รูดหลัง เลข ${number} ใช้หรอไม่ใช้ `
      );
    }
    this.list100.forEach((res, hdex) => {
      if (res.text[1].indexOf(this.itemSelect.listSwipeBack[index].text) >= 0) {
        if (!this.isDelete.active) {
          for (let idx = 0; idx < this.list100Select.length; idx++) {
            if (this.list100Select[idx].text == res.text) {
              this.listData.forEach((data) => {
                if (
                  data.active &&
                  !data.isSwitch &&
                  this.list100Select[idx].code == data.code
                ) {
                  this.list100Select.splice(idx, 1);
                }
              });
            }
          }
          res.active = true;
          this.listData.forEach((data) => {
            if (data.active && !data.isSwitch) {
              this.list100Select.push({
                text: res.text,
                active: true,
                code: data.code,
                isSwitch: data.isSwitch,
                max: data.max,
                maxNum: data.maxNum,
                min: data.min,
                num: data.min,
                total: data.multi,
                type: data.lottoName,
              });
            }
          });
        } else {
          if (isDeleteOne) {
            this.isDelete.list100.push(hdex);
          } else {
            res.active = false;
          }
          let numArray = [];
          for (let idx = 0; idx < this.list100Select.length; idx++) {
            this.listData.forEach((data) => {
              if (
                res.text == this.list100Select[idx].text &&
                data.active &&
                !data.isSwitch &&
                this.list100Select[idx].code == data.code
              ) {
                numArray.push(idx);
              }
            });
          }
          numArray = numArray.slice().reverse();
          for (let i = 0; i < numArray.length; i++) {
            this.list100Select.splice(numArray[i], 1);
          }
        }
      }
    });
    if (this.isDelete.active) {
      this.list100SelectBackupDelete = [];
      this.list100SelectBackupDelete = this.list100SelectBackupDelete.concat(
        this.list100Select
      );
      this.coustAddSelectBackup = this.list100Select.length - count;
      this.list100Select = this.list100SelectBackup;
    } else {
      this.coustAddSelect = this.list100Select.length - count;
    }
  }
  selectDoubleFn() {
    let count = this.list100Select.length;
    let douNum = ['00', '11', '22', '33', '44', '55', '66', '77', '88', '99'];
    this.listData.forEach((data) => {
      if (data.active && !data.isSwitch) {
        douNum.forEach((num) => {
          this.list100Select.forEach((sel, idx) => {
            if (num == sel.text && sel.code == data.code) {
              this.list100Select.splice(idx, 1);
            }
          });
          this.list100Select.push({
            text: num,
            active: true,
            code: data.code,
            isSwitch: data.isSwitch,
            max: data.max,
            maxNum: data.maxNum,
            min: data.min,
            num: data.min,
            total: data.multi,
            type: data.lottoName,
          });
        });
      }
    });
    this.coustAddSelect = this.list100Select.length - count;
  }
  selectLowerFn() {
    let count = this.list100Select.length;
    this.listData.forEach((data) => {
      if (data.active && !data.isSwitch) {
        for (let index = 0; index < 50; index++) {
          this.list100Select.forEach((sel, idx) => {
            if (index == sel.text && sel.code == data.code) {
              this.list100Select.splice(idx, 1);
            }
          });
          this.list100Select.push({
            text: this.numberTwoDigit(index),
            active: true,
            code: data.code,
            isSwitch: data.isSwitch,
            max: data.max,
            maxNum: data.maxNum,
            min: data.min,
            num: data.min,
            total: data.multi,
            type: data.lottoName,
          });
        }
      }
    });
    this.coustAddSelect = this.list100Select.length - count;
  }
  selectUpperFn() {
    let count = this.list100Select.length;
    this.listData.forEach((data) => {
      if (data.active && !data.isSwitch) {
        for (let index = 50; index < 100; index++) {
          this.list100Select.forEach((sel, idx) => {
            if (index == sel.text && sel.code == data.code) {
              this.list100Select.splice(idx, 1);
            }
          });
          this.list100Select.push({
            text: this.numberTwoDigit(index),
            active: true,
            code: data.code,
            isSwitch: data.isSwitch,
            max: data.max,
            maxNum: data.maxNum,
            min: data.min,
            num: data.min,
            total: data.multi,
            type: data.lottoName,
          });
        }
      }
    });
    this.coustAddSelect = this.list100Select.length - count;
  }
  selectEvenFn() {
    let count = this.list100Select.length;
    this.listData.forEach((data) => {
      if (data.active && !data.isSwitch) {
        for (let index = 0; index < 100; index += 2) {
          this.list100Select.forEach((sel, idx) => {
            if (index == sel.text && sel.code == data.code) {
              this.list100Select.splice(idx, 1);
            }
          });
          this.list100Select.push({
            text: this.numberTwoDigit(index),
            active: true,
            code: data.code,
            isSwitch: data.isSwitch,
            max: data.max,
            maxNum: data.maxNum,
            min: data.min,
            num: data.min,
            total: data.multi,
            type: data.lottoName,
          });
        }
      }
    });
    this.coustAddSelect = this.list100Select.length - count;
  }
  selectOddFn() {
    let count = this.list100Select.length;
    this.listData.forEach((data) => {
      if (data.active && !data.isSwitch) {
        for (let index = 1; index < 100; index += 2) {
          this.list100Select.forEach((sel, idx) => {
            if (index == sel.text && sel.code == data.code) {
              this.list100Select.splice(idx, 1);
            }
          });
          this.list100Select.push({
            text: this.numberTwoDigit(index),
            active: true,
            code: data.code,
            isSwitch: data.isSwitch,
            max: data.max,
            maxNum: data.maxNum,
            min: data.min,
            num: data.min,
            total: data.multi,
            type: data.lottoName,
          });
        }
      }
    });
    this.coustAddSelect = this.list100Select.length - count;
  }
  numberOneDigit(num) {
    return ('0' + num).slice(-1);
  }
  numberTwoDigit(num) {
    return ('00' + num).slice(-2);
  }
  numberThreeDigit(num) {
    return ('000' + num).slice(-3);
  }
  activeRangeFn(index, active?: Boolean) {
    this.list100 = [];
    this.itemSelect.range.range.forEach((res) => {
      res.active = false;
    });
    let typeStr;
    typeStr = this.itemSelect.lottoName;
    if (this.isNumSearchText) {
      this.itemSelect.range.range[index].active = false;
    } else {
      this.itemSelect.range.range[index].active = true;
    }

    let zero = '';
    let zeroLoop = '';
    for (
      let i = 0;
      i < this.itemSelect.range.range[index].text.length - 1;
      i++
    ) {
      zero = zero + '0';
    }
    zeroLoop = zero;
    // // _______________________ if เลข 0  -  99  ______________________________
    if (zeroLoop.length == 1) {
      zeroLoop = '00';
    }
    // // _______________________ if เลข 0  -  9  ______________________________
    else if (zeroLoop.length == 0) {
      zeroLoop = '0';
    } else {
      zeroLoop = '00';
    }
    if (this.isNumSearchText) {
      zeroLoop = '';
      for (let idx = 0; idx < this.itemSelect.digi; idx++) {
        zeroLoop += '0';
      }
    }
    for (let idx = 0; idx < Math.pow(10, zeroLoop.length); idx++) {
      let str = '' + idx;
      let pad = this.itemSelect.range.range[index].text.substring(0, 1) + zero;
      let ans = pad.substring(0, pad.length - str.length) + str;
      if (this.isNumSearchText) {
        if (
          this.numSearchText.toString().indexOf(ans) >= 0 ||
          ans.indexOf(this.numSearchText.toString()) >= 0
        ) {
          this.list100.push({
            text: ans,
            active: false,
            num: this.itemSelect.min,
            total: this.itemSelect.multi,
            type: typeStr,
            max: this.itemSelect.max,
            maxNum: this.itemSelect.maxNum,
            min: this.itemSelect.min,
            code: this.itemSelect.code,
            isSwitch: this.itemSelect.isSwitch,
          });
        }
      } else {
        this.list100.push({
          text: ans,
          active: false,
          num: this.itemSelect.min,
          total: this.itemSelect.multi,
          type: typeStr,
          max: this.itemSelect.max,
          maxNum: this.itemSelect.maxNum,
          min: this.itemSelect.min,
          code: this.itemSelect.code,
          isSwitch: this.itemSelect.isSwitch,
        });
      }
    }
    if (this.list100Select.length > 0) {
      this.list100Select.forEach((res) => {
        for (let index = 0; index < this.list100.length; index++) {
          if (
            res.text == this.list100[index].text &&
            res.code == this.list100[index].code
          ) {
            this.list100[index].active = true;
            break;
          }
        }
      });
    }
    for (let index = 0; index < this.list100.length; index++) {
      this.list100[index].isOver = false;
      this.list100[index].isClose = false;
      this.listNumOver.forEach((res) => {
        if (res.kindCode == this.list100[index].code) {
          res.listLimit.forEach((data) => {
            if (data.lottoNumber == this.list100[index].text) {
              this.list100[index].total = data.lottoPrice;
              this.list100[index].isOver = true;
            }
          });
        }
      });
      for (let idx = 0; idx < this.listNumClose.length; idx++) {
        if (this.listNumClose[idx].kindCode == this.list100[index].code) {
          for (
            let i = 0;
            i < this.listNumClose[idx].listCloseNumber.length;
            i++
          ) {
            if (
              this.listNumClose[idx].listCloseNumber[i].lottoNumber ==
              this.list100[index].text
            ) {
              this.list100[index].isClose = true;
              break;
            }
          }
        }
      }
    }
    if (active == undefined) {
      this.active100 = true;
    } else {
      this.active100 = false;
    }
  }
  checkDupp() {
    this.typeSelect = [];
    this.list100Select.forEach((res) => {
      if (this.typeSelect.length > 0) {
        let dupp = false;
        this.typeSelect.forEach((data) => {
          if (data == res.type) {
            dupp = true;
          }
        });
        if (!dupp) {
          this.typeSelect.push(res.type);
        }
      } else {
        this.typeSelect.push(res.type);
      }
    });
  }
  clearFn() {
    this.listNumberInput = [];
    for (let index = 0; index < this.digi; index++) {
      this.listNumberInput.push('');
    }
  }
  clear100SelectBackOneFn() {
    this.list100Select.splice(this.list100Select.length - 1, 1);
    this.coustAddSelect = -1;
  }
  clear100SelectFn(key: Number) {
    this.closeAllModal();
    this.addAlert(key);
    this.list192.forEach((res) => {
      res.active = false;
    });
    this.list19.forEach((res) => {
      res.active = false;
    });
    this.listSwipeFront.forEach((res) => {
      res.active = false;
    });
    this.listSwipeFront2.forEach((res) => {
      res.active = false;
    });
    this.listSwipeBack.forEach((res) => {
      res.active = false;
    });
    this.listSwipeBack2.forEach((res) => {
      res.active = false;
    });
    this.typeSelectFn(this.itemSelect);
    this.list100Select = [];
    this.activeRangeFn(0);
    this.is2digit = false;
    this.is2digitType = false;
    this.listType2Digit.forEach((res) => {
      res.active = false;
    });
    this.listData.forEach((res) => {
      res.active = false;
    });
    this.typeNumber = 0;
  }
  popFn() {
    for (let index = this.listNumberInput.length - 1; index >= 0; index--) {
      if (this.listNumberInput[index].toString().length > 0) {
        this.listNumberInput[index] = '';
        break;
      }
    }
  }
  comfirmFn() {
    let isCom = true;
    if (this.listError.length == 0) {
      if (this.isSuccess) {
        this.router.navigate(['/lottery/game-lotto']);
      }
      this.closeModal();
    } else {
      //console.log(this.listErrorData);
      this.listErrorData.forEach((element) => {
        element.forEach((res) => {
          if (res.status != HAS_NEW_LIMIT) {
            isCom = false;
          }
        });
      });
      if (isCom) {
        this.isComfirm = true;
        this.buyFn();
        this.listComfirm = [];
      } else {
        this.closeModal();
      }
    }
    this.isSuccess = false;
  }
  editModal() {
    this.closeModal();
    this.listError = [];
    this.openBillModal(true);
  }
  buyFn() {
    if (this.list100Select.length == 0) {
      this.alertText = this.noSelectText;
      this.isSuccess = false
      this.isBuySuccess = false
      this.dataSaveBackup = {
        payNumber: []
      }
      this.openShowAlertModal();
    } else {
      let data = {
        username: localStorage.getItem('username'),
        lottoClassCode: this.code,
        payNumber: [],
      };

      let type = [];
      this.list100Select.forEach((data) => {
        let isDupp = false;
        if (type.length == 0) {
          type.push(data.code);
        } else {
          type.forEach((res, index) => {
            if (res == data.code) {
              isDupp = true;
            }
          });
          if (!isDupp) {
            type.push(data.code);
          }
        }
      });
      type.forEach((res) => {
        let lottoBuy = [];
        let code;
        this.list100Select.forEach((data) => {
          if (data.code == res) {
            if (this.isComfirm) {
              this.listComfirm.forEach((con) => {
                //console.log(data.num, '   ', con.text);
                //console.log(con.code, '   ', res);

                if (con.code == res && data.text == con.lottoNumber) {
                  data.total = con.newPrize;
                  data.confirm = true;
                }
              });
            }
            lottoBuy.push({
              lottoNumber: data.text,
              payCost: data.num,
              prize: data.total,
              confirm: data.confirm ? data.confirm : false,
            });
            code = data.code;
          }
        });
        data.payNumber.push({ lottoKindCode: code, lottoBuy: lottoBuy });
      });
      this.dataSaveBackup = data;
      let allCost = 0;
      this.dataSaveBackup.payNumber.forEach((element) => {
        let total = 0;
        element.lottoBuy.forEach((res) => {
          total += res.payCost;
        });
        element.total = total;
        allCost += total;
      });
      this.dataSaveBackup.allCost = allCost;
      this.openBuyModal();
    }
  }
  buy2fn() {
    this.dataSaveBackup.vipCode = localStorage.getItem('groupCode')
    let data = this.dataSaveBackup;
    this.closeModal();
    this.listError = [];
    this.listComfirm = [];
    this.listErrorData = [];
    this.httpClient.doPost('lotto/buy-lotto', data).subscribe((res) => {
      this.isBuyError = res.data;
      this.isBuySuccess = this.isBuyError.success;
      this.lottoTransactionGroupCode = res.data.lottoTransactionGroupCode;
      this.getMoney();
      this.layout.getMoneyLotto();
      if (res.status == 'FAILED') {
        this.alertText = res.message;
      } else {
        if (this.isBuyError.outOffBalance) {
          this.alertText = 'เงินในบัญชีไม่เพียงพอ';
          this.isSuccess = false;
        } else if (this.isBuyError.serverBuyFail) {
          this.alertText = 'การซื้อเกิดข้อผิดผลาด กรุณาลองใหม่ค่ะ';
          this.isSuccess = false;
          this.listError = res.data.error;

          this.alertText =
            this.isBuyError.message == BUY_TIME_OUT
              ? 'รายการซื้อรอบนี้ หมดเวลาการรับแทงแล้ว'
              : this.alertText;
          this.listError.forEach((data) => {
            this.listData.forEach((element) => {
              if (data.lottoKindCode == element.code && !element.isSwitch) {
                data.name = element.lottoName;
              }
            });
          });
          this.listErrorCheck.forEach((res) => {
            let data = [];
            this.listError.forEach((err) => {
              err.lottoBuy.forEach((element) => {
                if (element.status == res.code) {
                  this.alertText = res.text;
                  element.code = err.lottoKindCode;
                  element.name = err.name;
                  for (let i = 0; i < this.list100Select.length; i++) {
                    if (
                      this.list100Select[i].text == element.lottoNumber &&
                      this.list100Select[i].code == element.code
                    ) {
                      element.payCost = this.list100Select[i].num;
                      break;
                    }
                  }
                  data.push(element);
                  if (element.status == HAS_NEW_LIMIT) {
                    this.listComfirm.push(element);
                  }
                  //console.log(element);
                }
              });
            });
            this.listErrorData.push(data);
            // //console.log(data);
          });
          //console.log(this.listErrorCheck);
          //console.log(this.listErrorData);
        } else if (this.isBuyError.success) {
          this.alertText = 'ระบบได้ทำการส่งโพยของท่านเรียบร้อยแล้ว';
          this.isSuccess = true;
          this.list100Select = [];
          this.listData.forEach((res) => {
            res.active = false;
          });
          this.listType2Digit.forEach((res) => {
            res.active = false;
          });
          this.typeNumber = 0;
          this.is2digit = false;
          this.clear100SelectFn(0);
          // this.router.navigate(["/lottery/game-lotto"]);
          //console.log('HERE!!!!');
        }
      }
      this.openShowAlertModal();
    });
  }
  swichNum(num: String) {
    let count = this.list100Select.length;
    let sliceNum = [];
    let listNum = [];
    for (let index = 0; index < num.length; index++) {
      sliceNum.push(num.slice(index, index + 1));
    }
    if (num.length == 3) {
      listNum.push(sliceNum[0] + sliceNum[1] + sliceNum[2]);
      listNum.push(sliceNum[0] + sliceNum[2] + sliceNum[1]);
      listNum.push(sliceNum[1] + sliceNum[0] + sliceNum[2]);
      listNum.push(sliceNum[1] + sliceNum[2] + sliceNum[0]);
      listNum.push(sliceNum[2] + sliceNum[0] + sliceNum[1]);
      listNum.push(sliceNum[2] + sliceNum[1] + sliceNum[0]);
    } else if (num.length == 2) {
      listNum.push(sliceNum[0] + sliceNum[1]);
      listNum.push(sliceNum[1] + sliceNum[0]);
    }
    if (listNum.length == 0) {
      listNum.push(num);
    }
    let listNotDupp = [];
    listNum.forEach((res) => {
      if (listNotDupp.length > 0) {
        let dupp = false;
        listNotDupp.forEach((data) => {
          if (data == res) {
            dupp = true;
          }
        });
        if (!dupp) {
          listNotDupp.push(res);
        }
      } else {
        listNotDupp.push(res);
      }
    });
    listNum = listNotDupp;

    for (let index = 0; index < listNum.length; index++) {
      let dataList = [];
      this.listData.forEach((res) => {
        if (res.active && !res.isSwitch) {
          let data = {
            text: listNum[index],
            active: true,
            min: res.min,
            num: res.min,
            total: res.multi,
            type: res.lottoName,
            code: res.code,
            max: res.max,
            maxNum: res.maxNum,
          };
          dataList.push(data);
        }
      });

      // data.text = listNum[index]
      if (this.list100Select.length > 0) {
        dataList.forEach((data) => {
          let duppli = false;
          this.list100Select.forEach((res) => {
            if (res.text == data.text && res.code == data.code) {
              duppli = true;
            }
          });
          if (!duppli) {
            this.list100Select.push(data);
          }
        });
      } else {
        this.list100Select = dataList;
      }
    }
    this.list100.forEach((res) => {
      this.list100Select.forEach((data) => {
        if (res.text == data.text && res.type == data.type) {
          res.active = true;
        }
      });
    });
    this.coustAddSelect = this.list100Select.length - count;
  }
  keyupFn(number) {
    if (this.typeNumber > 0)
      for (let index = 0; index < this.listNumberInput.length; index++) {
        if (this.listNumberInput[index].length == 0) {
          this.nextNumberInput(number, index);
          break;
        }
      }
  }
  removeList100Select(index) {
    for (let idx = 0; idx < this.list100.length; idx++) {
      if (this.list100[idx].text == this.list100Select[index].text) {
        this.list100[idx].active = false;
      }
    }
    let count = 0;
    this.typeSelectText.forEach((res) => {
      for (let idx = 0; idx < this.list100Select.length; idx++) {
        if (
          res == this.list100Select[index].type &&
          this.list100Select[index].code == this.list100Select[idx].code
        ) {
          count++;
        }
      }
    });

    let remove;
    if (count == 1) {
      this.typeSelectText.forEach((res, jdx) => {
        if (res == this.list100Select[index].type) {
          remove = jdx;
        }
      });
      this.typeSelectText.splice(remove, 1);
    }
    this.list100Select.splice(index, 1);
    this.checkNumPlay();
  }
  nextNumberInput(number, index) {
    this.listNumberInput[index] = number;
    if (Number(number) > 9) {
      this.listNumberInput[index] = number.substring(1, 2);
    } else if (Number(number) < 0) {
      this.listNumberInput[index] = number.substring(1, 2);
    }

    if (this.digi == 1) {
      this.num1Ref.nativeElement.blur();
      let numText = '' + this.listNumberInput[0];
      this.pushInputNumber(numText);
      setTimeout(() => {
        this.clearFn();
      }, 500);
    } else if (this.digi == 2) {
      /**    this.is2digitType == true คือ แบบกดตัวเลือกเพิ่มเติมเช่น  19 ,รูดหน้า-หลัง          */
      if (this.is2digitType) {
        this.num1Ref.nativeElement.blur();
        let numText = '' + this.listNumberInput[0];
        this.check2digitOption(numText);
        setTimeout(() => {
          this.clearFn();
        }, 500);
      } else {
        if (index == 0) {
          setTimeout(() => {
            this.num2Ref.nativeElement.focus();
          }, 0);
        } else {
          this.num2Ref.nativeElement.blur();
          let numText = '' + this.listNumberInput[0] + this.listNumberInput[1];
          this.pushInputNumber(numText);
          setTimeout(() => {
            this.clearFn();
          }, 500);
        }
      }
    } else if (this.digi == 3) {
      if (index == 0) {
        setTimeout(() => {
          this.num2Ref.nativeElement.focus();
        }, 0);
      } else if (index == 1) {
        this.num3Ref.nativeElement.focus();
      } else {
        this.num3Ref.nativeElement.blur();
        let numText =
          '' +
          this.listNumberInput[0] +
          this.listNumberInput[1] +
          this.listNumberInput[2];
        this.pushInputNumber(numText);
        setTimeout(() => {
          this.clearFn();
        }, 500);
      }
    }
  }
  check2digitOption(text) {
    this.listType2Digit.forEach((res) => {
      if (res.active && res.isNeedInput) {
        if (res.code == DOOR_19) {
          this.select19Fn(text);
        } else if (res.code == FRONT) {
          this.selectSwipeFrontFn(text);
        } else if (res.code == BACK) {
          this.selectSwipeBackFn(text);
        }
      }
    });
  }
  addPlay(num) {
    if (this.numPlay == 1) {
      this.numPlay = 0;
    }
    this.numPlay = this.numPlay + num;
  }
  checkMax() {
    let countActive = 0;
    for (let index = 0; index < this.list100Select.length; index++) {
      if (this.list100Select[index].active) {
        countActive += 1;
        this.list100Select[index].num = this.numPlay;
        if (null != this.list100Select[index].max) {
          if (Number(this.list100Select[index].max) < Number(this.numPlay)) {
            this.list100Select[index].num = this.list100Select[index].max;
          } else if (Number(this.numPlay) < 0) {
            this.list100Select[index].num = 1;
          }
        }
        if (null != this.list100Select[index].min) {
          if (Number(this.list100Select[index].min) > Number(this.numPlay)) {
            this.list100Select[index].num = this.list100Select[index].min;
          }
        }
      }
    }
    if (countActive == 0) {
      for (let index = 0; index < this.list100Select.length; index++) {
        this.list100Select[index].num = this.numPlay;
        if (null != this.list100Select[index].max) {
          if (Number(this.list100Select[index].max) < Number(this.numPlay)) {
            this.list100Select[index].num = this.list100Select[index].max;
          } else if (Number(this.numPlay) < 0) {
            this.list100Select[index].num = 1;
          }
        }
        if (null != this.list100Select[index].min) {
          if (Number(this.list100Select[index].min) > Number(this.numPlay)) {
            this.list100Select[index].num = this.list100Select[index].min;
          }
        }
      }
    }
    this.checkNumPlay();
  }
  checkMaxOne(value, index) {
    if (null != this.list100Select[index].max) {
      if (Number(this.list100Select[index].max) < Number(value)) {
        this.list100Select[index].num = this.list100Select[index].max;
      }
    }
    if (null != this.list100Select[index].min) {
      if (Number(this.list100Select[index].min) > Number(value)) {
        this.list100Select[index].num = this.list100Select[index].min;
      }
    }
    this.checkNumPlay();
  }
  checkNumPlay() {
    this.numPlayTotal = 0;
    for (let index = 0; index < this.list100Select.length; index++) {
      this.numPlayTotal += this.list100Select[index].num;
    }
  }
  pushInputNumber(numText) {
    let count = this.list100Select.length;
    if (this.isSwitch) {
      this.swichNum(numText);
    } else {
      this.listData.forEach((res) => {
        if (res.active) {
          if (this.list100Select.length > 0) {
            let isDupp = false;
            this.list100Select.forEach((data) => {
              if (data.text == numText.toString() && res.code == data.code) {
                isDupp = true;
              }
            });
            if (!isDupp) {
              this.list100Select.push({
                text: numText.toString(),
                active: true,
                code: res.code,
                max: res.max,
                maxNum: res.maxNum,
                min: res.min,
                num: res.min,
                total: res.multi,
                type: res.lottoName,
              });
            }
          } else {
            this.list100Select.push({
              text: numText.toString(),
              active: true,
              code: res.code,
              max: res.max,
              maxNum: res.maxNum,
              min: res.min,
              num: res.min,
              total: res.multi,
              type: res.lottoName,
            });
          }
        }
      });
    }
    let arr = [];
    for (let index = 0; index < this.list100Select.length; index++) {
      for (let idx = 0; idx < this.listNumClose.length; idx++) {
        if (this.listNumClose[idx].kindCode == this.list100Select[index].code) {
          for (
            let i = 0;
            i < this.listNumClose[idx].listCloseNumber.length;
            i++
          ) {
            if (
              this.listNumClose[idx].listCloseNumber[i].lottoNumber ==
              this.list100Select[index].text
            ) {
              arr.push(index);
              break;
            }
          }
        }
      }
    }
    let reverseArr = arr.slice().reverse();
    reverseArr.forEach((res) => {
      this.list100Select.splice(res, 1);
    });
    this.coustAddSelect = this.list100Select.length - count;
  }
  getPushPoy() {
    this.listPushPoy = [];
    this.httpClient
      .doGetLotto('transaction-group/get-transaction-group-by-user-pending')
      .subscribe((res) => {
        res.data.forEach((element) => {
          if (element.lottoClassCode == this.code) {
            this.listPushPoy.push(element);
          }
        });
        // this.httpClient
        //   .doGetLotto(
        //     'transaction-group/get-transaction-group-by-user-show/'+this.isGovernment? government:stocks
        //   )
        //   .subscribe((res) => {
        //     this.listPushPoy = this.listPushPoy.concat(res.data);
        //   });
      });
  }

  onPoyDetail(code, idx) {
    this.codeText = code;
    this.listPushPoy.forEach((res) => {
      if (res.active) {
        res.active = false;
      }
    });
    this.listPushPoy[idx].active = true;
    this.sumBet = null;
    this.sumPrizeWin = null;
    this.listPoyDetail = [];
    this.httpClient
      .doGetLotto('transaction-group/get-transaction-detail-by-code/' + code)
      .subscribe((res) => {
        this.sumBet = res.data.sumBet;
        this.sumPrizeWin = res.data.sumPrizeWin;
        res.data.listTrantsaction.forEach((data) => {
          this.listPoyDetail.push({
            kindName: data.kindName,
            lottoNumber: data.lottoNumber,
            payCost: data.payCost,
            prize: data.prize,
            prizeResult: data.prizeResult,
            status: data.status,
          });
        });
      });
  }
  selectPushPoy(code) {
    let count = this.list100Select.length;
    this.httpClient
      .doGetLotto('transaction-group/get-transaction-detail-by-code/' + code)
      .subscribe((res) => {
        this.listData.forEach((data) => {
          for (
            let index = 0;
            index < res.data.listTrantsaction.length;
            index++
          ) {
            if (
              res.data.listTrantsaction[index].kindCode == data.code &&
              !data.isSwitch
            ) {
              res.data.listTrantsaction[index].lottoName = data.lottoName;
              res.data.listTrantsaction[index].maxNum = data.maxNum;
              res.data.listTrantsaction[index].min = data.min;
              res.data.listTrantsaction[index].max = data.max;
              res.data.listTrantsaction[index].total = data.multi;
              res.data.listTrantsaction[index].code = data.code;
            }
          }
        });
        if (this.list100Select.length == 0) {
          res.data.listTrantsaction.forEach((element) => {

            this.list100Select.push({
              active: false,
              code: element.kindCode,
              max: element.max,
              maxNum: element.maxNum,
              min: element.min,
              num: element.min,
              text: element.kindCode.indexOf("3") >= 0 ? this.numberThreeDigit(element.lottoNumber) :
                (element.kindCode.indexOf("2") >= 0 ? this.numberTwoDigit(element.lottoNumber) : this.numberOneDigit(element.lottoNumber)),
              total: element.total,
              type: element.lottoName,
            });
          });
        } else {
          res.data.listTrantsaction.forEach((element) => {
            let isDupp = false;
            this.list100Select.forEach((data) => {
              if (
                data.text == element.lottoNumber &&
                data.code == element.kindCode
              ) {
                isDupp = true;
              }
            });
            if (!isDupp) {
              this.list100Select.push({
                active: false,
                code: element.kindCode,
                max: element.max,
                maxNum: element.maxNum,
                min: element.min,
                num: element.min,
                text: element.kindCode.indexOf("3") >= 0 ? this.numberThreeDigit(element.lottoNumber) :
                  (element.kindCode.indexOf("2") >= 0 ? this.numberTwoDigit(element.lottoNumber) : this.numberOneDigit(element.lottoNumber)),
                total: element.total,
                type: element.lottoName,
              });
            }
          });
        }
      });
    this.closeAllModal();
    this.coustAddSelect = this.list100Select.length - count;
  }
  isFingerFn(index) {
    this.typeSelect = [];

    for (let idx = 0; idx < this.isFinger.length; idx++) {
      this.isFinger[idx] = false;
    }
    this.isFinger[index] = true;
    if (index == 0) {
      this.listData.forEach((res) => {
        res.active = false;
      });
      this.typeNumber = 0;
      // this.listData[0].active = true
      // this.typeSelect.push(this.listData[0])
    } else if (index == 1) {
      this.listData.forEach((res) => {
        res.active = false;
      });
      this.typeNumber = 0;
      // this.listData[0].active = true
      // this.typeSelect.push(this.listData[0])
    }
    // this.itemSelect = this.listData[0]
    this.clearFn();
  }

  closeModal() {
    this.modalRef.hide();
    if (null != this.isBuyError) {
      if (this.isBuyError.success) {
        this.router.navigate(['/lottery/game-lotto']);
        this.layout.getMoneyLotto();
      }
    }
  }
  closeAllModal() {
    this.isBuyError = null;
    this.modalRef.hide();
  }
  openModal() {
    this.modalRef = this.modalService.show(this.showModal, {
      class: 'modal-dialog-centered',
    });
  }

  getSelectPoy(id) {
    let count = this.list100Select.length;
    this.httpClient
      .doGet('lotto-group-number/get-by-id/' + id)
      .subscribe((res) => {
        this.listData.forEach((data) => {
          for (
            let index = 0;
            index < res.data.lottoGroupNumberChildList.length;
            index++
          ) {
            if (
              res.data.lottoGroupNumberChildList[index].lottoKind ==
              data.code &&
              !data.isSwitch
            ) {
              res.data.lottoGroupNumberChildList[index].isHave = true
              res.data.lottoGroupNumberChildList[index].lottoName =
                data.lottoName;
              res.data.lottoGroupNumberChildList[index].maxNum = data.maxNum;
              res.data.lottoGroupNumberChildList[index].min = data.min;
              res.data.lottoGroupNumberChildList[index].max = data.max;
              res.data.lottoGroupNumberChildList[index].total = data.multi;
            }
          }
        });
        if (this.list100Select.length == 0) {
          res.data.lottoGroupNumberChildList.forEach((element) => {
            if (element.isHave) {
              this.list100Select.push({
                active: false,
                code: element.lottoKind,
                max: element.max,
                maxNum: element.maxNum,
                min: element.min,
                num: element.min,
                text: element.lottoKind.indexOf("3") >= 0 ? this.numberThreeDigit(element.lottoNumber) :
                  (element.lottoKind.indexOf("2") >= 0 ? this.numberTwoDigit(element.lottoNumber) : this.numberOneDigit(element.lottoNumber)),
                total: element.total,
                type: element.lottoName,
              });
            }
          });
        } else {
          res.data.lottoGroupNumberChildList.forEach((element) => {
            let isDupp = false;
            this.list100Select.forEach((data) => {
              if (
                data.text == element.lottoNumber &&
                data.code == element.lottoKind
              ) {
                isDupp = true;
              }
            });
            if (!isDupp) {
              if (element.isHave) {
                this.list100Select.push({
                  active: false,
                  code: element.lottoKind,
                  max: element.max,
                  maxNum: element.maxNum,
                  min: element.min,
                  num: element.min,
                  text: element.lottoKind.indexOf("3") >= 0 ? this.numberThreeDigit(element.lottoNumber) :
                    (element.lottoKind.indexOf("2") >= 0 ? this.numberTwoDigit(element.lottoNumber) : this.numberOneDigit(element.lottoNumber)),
                  total: element.total,
                  type: element.lottoName,
                });
              }
            }
          });
        }
      });
    this.closeModal();
    this.coustAddSelect = this.list100Select.length - count;
  }
  openPoyModal(isOpening) {
    this.httpClient
      .doGet(
        'lotto-group-number/get-by-username/' + localStorage.getItem('username')
      )
      .subscribe((res) => {
        this.isPoy = [true, false];
        this.listPoy = res.data;
      });
    if (isOpening) {
      this.closeAllModal();
    }
    this.modalRef = this.modalService.show(this.showPoyModal, {
      class: 'modal-dialog-centered',
    });
  }
  openShowAlertModal() {
    this.closeAllModal();
    this.modalRef = this.modalService.show(this.showAlertModal, {
      class: 'modal-dialog-centered',
    });
  }
  openAlertDelete(text) {
    let count = 0;
    this.listType2Digit
      .slice()
      .reverse()
      .forEach((res) => {
        if (res.active) {
          if (count > 0) {
            res.active = false;
          }
          count++;
        }
      });
    if (count == 1) {
      this.showAlertContirmTextStr.text = text;
      this.modalRef = this.modalService.show(this.showAlertDelete, {
        class: 'modal-dialog-centered',
        backdrop: 'static',
      });
    }
  }
  openAlertDelete2(text) {
    this.showAlertContirmTextStr.text = text;
    this.modalRef = this.modalService.show(this.showAlertDelete, {
      class: 'modal-dialog-centered',
      backdrop: 'static',
    });
  }

  openAlertContirmTextModal(isOpening, text, status) {
    if (isOpening) {
      this.closeModal();
    }
    this.showAlertContirmTextStr.text = text;
    this.showAlertContirmTextStr.status = status;
    this.modalRef = this.modalService.show(this.showAlertContirmText, {
      class: 'modal-dialog-centered',
    });
  }
  editlist100Select(index) {
    this.list100Select[index].active = !this.list100Select[index].active;
    if (this.list100Select[index].active)
      this.numPlay = this.list100Select[index].num;
  }
  openBuyModal() {
    this.closeAllModal();
    this.modalRef = this.modalService.show(this.showContirmBuy, {
      class: 'modal-dialog-centered ',
    });
  }
  openBillModal(isShow: Boolean) {
    this.typeSelectText = [];
    this.listData.forEach((res) => {
      this.list100Select.forEach((data) => {
        if (data.code == res.code) {
          if (null != data.lottoName) {
            if (data.lottoName.indexOf('+') >= 0) {
              data.lottoName = res.lottoName;
            }
          } else {
            data.lottoName = res.lottoName;
          }
        }
      });
    });

    for (let index = 0; index < this.list100Select.length; index++) {
      this.list100Select[index].active = false;
      this.list100Select[index].isOver = false;
      let isDupp = false;
      if (this.typeSelectText.length == 0) {
        this.typeSelectText.push(this.list100Select[0].lottoName);
        isDupp = true;
      } else {
        this.typeSelectText.forEach((res) => {
          if (res == this.list100Select[index].lottoName) {
            isDupp = true;
          }
        });
      }
      if (!isDupp) {
        this.typeSelectText.push(this.list100Select[index].lottoName);
      }

      this.listNumOver.forEach((res) => {
        if (res.kindCode == this.list100Select[index].code) {
          res.listLimit.forEach((data) => {
            if (data.lottoNumber == this.list100Select[index].text) {
              this.list100Select[index].total = data.lottoPrice;
              this.list100Select[index].isOver = true;
            }
          });
        }
      });
    }
    this.checkNumPlay();
    if (isShow) {
      this.modalRef = this.modalService.show(this.showBillModal, {
        class: 'modal-dialog-centered ',
      });
    }
  }

  groupSelectFn(item, index) {
    this.itemSelect = null;
    this.listType.forEach((res) => {
      res.active = false;
    });
    this.listType[index].active = true;
    this.listDataDupp = [];
    this.listData.forEach((res) => {
      res.active = false;
      if (item.group == res.group) {
        this.listDataDupp.push(res);
      }
    });
    this.type = index;
    this.active100 = false;
    this.set100Fn(this.listDataDupp[0].digi);
  }
  scrollto(to: string) {
    setTimeout(() => {
      document.getElementById(to).scrollIntoView({
        behavior: 'smooth'
      });
    }, 250);
  }
  typeSelectFn(item) {

    if (item.digi == 2) {
      this.is2digit = true;
    } else {
      this.is2digit = false;
    }
    if (!item.isSwitch) this.itemSelect = null;
    this.isNumSearchText = false;
    let is3Swapped = false;
    let isSwitchActive = false;
    let isSameDigit = true;
    this.listData.forEach((res) => {
      if (item.lottoName == res.lottoName) {
        res.active = !res.active;
      }
      if (res.active && res.isSwitch) {
        isSwitchActive = true;
        this.isSwitchFn(true);
      }
      if (res.code == _3DIGIT_SWAPPED.code && res.active) {
        is3Swapped = true;
      }
      if (res.active && res.digi != item.digi) {
        isSameDigit = false;
      }
    });
    if (!isSwitchActive) {
      this.isSwitchFn(false);
    }
    if ((isSwitchActive && is3Swapped) || !isSameDigit) {
      this.listData.forEach((data) => {
        data.active = false;
        if (!isSameDigit && item.lottoName == data.lottoName) {
          data.active = true;
        }
        if(!item.isSwitch){
          this.isSwitchFn(false)
        }
      });
    }
    // this.typeSelect = []
    if (!item.isSwitch) {
      this.itemSelect = item;
    } else {
      this.listType2Digit.forEach((element) => {
        element.active = false;
        this.is2digitType = false;
      });
    }
    if (this.typeSelect.length == 0) {
      this.typeSelect.push(item);
    } else {
      let isDupplicate = false;
      let idx;
      for (let index = 0; index < this.typeSelect.length; index++) {
        if (this.typeSelect[index].code == item.code) {
          isDupplicate = true;
          idx = index;
        }
      }
      if (isDupplicate) {
        this.typeSelect.splice(idx, 1);
      } else {
        this.typeSelect.push(item);
      }
    }
    this.listNumberInput = [];

    this.typeNumber = 0;
    let countActiveAll = 0
    let countActiveSwitch = 0
    this.listData.forEach((res) => {
      if (res.active) {
        this.typeNumber += 1;
        this.digi = res.digi;
        countActiveAll++
        if (res.isSwitch) {
          countActiveSwitch++
        }
      }
    });
    if (countActiveSwitch == countActiveAll) {
      this.typeNumber = 0;
      this.digi = 0;
    }
    if (this.digi != 2) {
      this.is2digitType = false;
    }
    if (!isSameDigit) {
      this.listType2Digit.forEach((res) => {
        res.active = false;
      });
    }
    if (this.typeNumber > 0) {
      for (let index = 0; index < this.digi; index++) {
        this.listNumberInput.push('');
      }
      if (this.isFinger[0]) {
        setTimeout(() => {
          // this.num1Ref.nativeElement.focus();     // if user want to focus num
          if (item.digi == 2) {
            this.scrollto('scrollTo2')
          } else {
            this.scrollto('scrollTo1')
          }
        }, 0);
      } else {
        this.scrollto('scrollTo1')
      }
    }
    this.activeRangeFn(0);



  }
  getLotto() {
    this.httpClient
      .doGetLotto(
        'lotto-list/get-class-web/' +
        this.code +
        '/' +
        localStorage.getItem('groupCode')
      )
      .subscribe((res) => {
        this.lottoData = res.data;
        this.lottoData.prizeSetting.forEach((element) => {
          for (let index = 0; index < this.listData.length; index++) {
            if (this.listData[index].code == element.lottoKind) {
              // if (this.listData[index].code == element.lottoKind && localStorage.getItem('groupCode') == element.vipCode) {
              // this.listData[index].lottoName = element.lottoName
              this.listData[index].multi = element.prize;
              this.listData[index].max = element.maximumPerTrans;
              this.listData[index].maxNum = element.maximumPerUser;
              this.listData[index].min = element.minimumPerTrans;
              this.listData[index].num = element.minimumPerTrans;
            }
          }
        });
        this.dateClose = moment(this.lottoData.timeSell[0].timeClose).format(
          'HH:mm'
        );
        this.getLottoOver();
      });
  }
  getLottoOver() {
    this.httpClient
      .doGetLotto('limit-number/get-all/' + this.code)
      .subscribe((data) => {
        this.listNumOver = data.data;
      });
  }
  getLottoClose() {
    this.httpClient
      .doGetLotto('close-number/get-all/' + this.code)
      .subscribe((data) => {
        this.listNumClose = data.data;
      });
  }
  set100Fn(digi?) {
    digi = Math.pow(10, digi > 2 ? 2 : digi) || 100;
    this.list100 = [];
    for (let index = 0; index < digi; index++) {
      this.list100.push({
        text: index.toString(),
        active: false,
        num: 1,
        total: 120,
        type: '',
        max: 1,
        maxNum: 1,
        min: 1,
        isSwitch: false,
      });
    }
  }

  searchNum() {
    this.isNumSearchText =
      this.numSearchText != null
        ? this.numSearchText.toString().length > 0
          ? true
          : false
        : false;
    if (null != this.itemSelect) {
      this.activeRangeFn(0);
    } else {
      this.alertText = 'กรุณาเลือกประเภทการเล่นค่ะ';
      this.openShowAlertModal();
    }
  }
}
