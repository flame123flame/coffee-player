import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { HttpService } from 'src/app/service/http.service';
import { AuthService } from 'src/app/auth/auth.service';
import { MessageService } from 'src/app/service/message.service';
import { Router, ActivatedRoute } from '@angular/router';
import { listBank } from 'src/app/common/constant/bank-constant';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
declare var $: any;
interface sta {
  isLogin: Boolean;
  isRegister: Boolean;
}
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css'],
})
export class RegisterUserComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  @Input() register: string = '1';
  @Input() phone: string = '';
  classActine = 999;
  message: string;
  mode = new FormControl('over');

  /** send API */
  passwordText = 'password';
  mobilePhone: string = '';
  otp: string;
  username: string = '';
  password: string = '';
  recentPassword: string;
  bankCode: string;
  realName: string;
  bankAccount: string;

  /** res */
  readonly countWrongRound = 3;
  refCode: string;
  duplicateNumber: boolean;

  /** state */
  state = 1;
  tabIx = 1;
  statusOtp = '';
  countWrongOtp = 0;
  delayMap = {};
  item: any = {
    bankAccount: null,
    bankCode: null,
    username: null,
    realName: null,
    mobilePhone: null,
  };
  checkLogin = 'สมัครสมาชิก';
  showImage = false;
  check = false;
  showTextValiDate: any;
  // register = "1";
  formRegister: FormGroup;
  buttonLogin = false;
  textShowHeaderBoolean = true;
  bankName = 'กรุณาเลือกธนาคาร';
  textShowHeader = 'สมัครสมาชิก';
  textShowButton = 'เข้าสู่ระบบ';
  expression = false;
  isBankName = false;
  buttonCancel = false;
  Showcondition = false;
  inputShowHeader = true;
  inputOTP = false;
  inputPhone = false;
  inputUserName = true;
  inputPassword = true;
  inputNewPassword = false;
  inputConfirmPassword = false;
  inputFnameLname = false;
  inputBank = false;
  buttonPhone = false;
  buttonOPT = false;
  buttonBank = false;
  buttonSubmit = true;
  buttonRegister = false;
  listBank = false;
  testt: any;
  setListBank: any[] = listBank;

  length: any[] = [
    { name: 'ธนาคารกรุงเทพ', src: 'assets/image/bank/bankok.png' },
    { name: 'ธนาคารเกียรตินาคิน', src: 'assets/image/bank/k.png' },
    { name: 'ธนาคารไอซีบีซี', src: 'assets/image/bank/cimb.png' },
    { name: 'ธนาคารกสิกรไทย', src: 'assets/image/bank/kasikron.png' },
  ];
  token: any;
  username2: any;

  formSave: FormGroup;
  public textErrorLogin: string = '';
  af: any;
  status: sta = {
    isRegister: false,
    isLogin: false
  }
  constructor(
    private authSV: AuthService,
    private httpSV: HttpService,
    private fb: FormBuilder,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder
  ) {
    this.route.queryParams.subscribe(params => {
      if (null != params.token) {
        this.authSV.login(params.token, params.username);
      }
    });
    this.formSave = this.formBuilder.group({
      username: [''],
      password: [''],
      otp: [''],
      check: [''],
      realName: [''],
      bankAccount: [''],
      mobilePhone: [''],
    });
  }

  ngOnInit(): void {
    $('#accordion').on('show.bs.collapse', function () {
      $('#accordion .in').collapse('hide');
    });
    $('.collapse.in').removeClass('collapse in');
    this.showImage = false;

    $('.carousel').carousel({
      interval: false,
    });

    if (this.router.url.indexOf('invitation') > -1) {
      //console.log("invitation");

      this.af = this.route.snapshot.queryParams['af'] || '';
      // this.getAffiliate();
      this.clickRegister();
    }
    this.clickLogin();
  }
  checkPhone(e: String) {
    this.mobilePhone = this.checkNumber(e)
  }
  checkOTP(e: string) {
    this.otp = this.checkNumber(e)
  }
  checkBankAccount(e: string) {
    this.bankAccount = this.checkNumber(e)
  }
  checkNumber(e: String) {
    let num = ""
    if ("0" <= e[e.length - 1] && e[e.length - 1] <= "9") {
      num = e.toString().toLowerCase()
    } else {
      num = e.substring(0, e.length - 1).toLowerCase()
    }
    return num
  }
  checkUsername(e: String) {
    if (("A" <= e[e.length - 1] && e[e.length - 1] <= "Z")
      || ("a" <= e[e.length - 1] && e[e.length - 1] <= "z")
      || ("0" <= e[e.length - 1] && e[e.length - 1] <= "9")) {
      this.username = e.toString().toLowerCase()
    } else {
      this.username = e.substring(0, e.length - 1).toLowerCase()
    }
  }
  lotteryResults() {
    this.register = '6';
  }

  switchSideNav() {
    this.sidenav.toggle();
  }

  forgotPassword() {
    this.register = '3';
    this.buttonLogin = true;
  }
  getAffiliate() {
    this.httpSV
      .doGet('web-player/affiliate-player/trigger-affiliate/' + this.af)
      .subscribe((res) => {
        //console.log(res.data);
      });
  }

  selectBank(bank, inx, code) {
    this.classActine = inx;
    this.bankName = bank;
    this.bankCode = code;
  }
  clickLogin() {
    this.clickShowLogin();
  }
  click() {
    this.clickRegister();
  }
  clickShowLogin() {
    this.setStatus('login')
    this.showTextValiDate = '';
    this.showImage = true;
    this.checkLogin = 'สมัครสมาชิก';
    this.textShowButton = 'สมัครสมาชิก';
    this.textShowHeaderBoolean = true;
    this.expression = true;
    this.textErrorLogin = '';
    this.textShowHeader = '';
    this.register = '1';
    this.listBank = false;
    this.buttonLogin = false;
    this.isBankName = false;
    this.buttonRegister = false;
    this.buttonCancel = false;
    this.inputShowHeader = true;
    this.inputOTP = false;
    this.inputPhone = false;
    this.inputUserName = true;
    this.inputPassword = true;
    this.inputNewPassword = false;
    this.inputConfirmPassword = true;
    this.inputFnameLname = false;
    this.inputBank = false;
    this.buttonOPT = false;
    this.buttonBank = false;
    this.buttonSubmit = true;
    this.Showcondition = false;
    this.buttonPhone = false;
  }
  refresh(): void {
    window.location.reload();
  }

  clickBackRegister() {

    this.inputOTP = false;
    this.showTextValiDate = '';
    this.checkLogin = 'เข้าสู่ระบบ';
    this.textShowHeaderBoolean = false;
    this.inputConfirmPassword = false;
    this.expression = true;
    this.register = '1';
    this.tabIx = 1;
    this.mobilePhone = this.mobilePhone;
    this.textErrorLogin = '';
    this.listBank = false;
    this.buttonLogin = true;
    this.Showcondition = true;
    this.buttonPhone = true;
    this.buttonSubmit = false;
    this.buttonOPT = false;
    this.inputShowHeader = false;
    this.inputUserName = true;
    this.inputPassword = false;
    this.inputPhone = true;
    this.textShowHeader = 'ยินดีต้อนรับ';
    this.httpSV.doGet('web-player/register/register-fail/' + this.username.toLocaleLowerCase().trim())
      .subscribe((res) => {

      });


  }
  setStatus(status: string) {
    this.status = {
      isLogin: false,
      isRegister: false
    }
    switch (status.toLowerCase()) {
      case "login":
        this.status.isLogin = true
        break;
      case "register":
        this.status.isRegister = true
        break;

      default:
        break;
    }
  }
  clickRegister() {
    //console.log("เข้าใหม่");
    this.setStatus('register')
    this.mobilePhone = '';
    this.username = '';
    this.password = '';
    this.tabIx = 1;
    // //console.log("ทดสอบ clickRegister");
    this.inputOTP = false;
    this.showTextValiDate = '';
    this.showImage = true;
    this.checkLogin = 'เข้าสู่ระบบ';
    this.textShowHeaderBoolean = false;
    this.inputConfirmPassword = false;
    this.expression = true;
    this.register = '1';
    this.textErrorLogin = '';
    this.listBank = false;
    this.buttonLogin = true;
    this.Showcondition = true;
    this.buttonPhone = true;
    this.buttonSubmit = false;
    this.buttonOPT = false;
    this.inputShowHeader = false;
    this.inputUserName = true;
    this.inputPassword = false;
    this.inputPhone = true;
    this.textShowHeader = 'ยินดีต้อนรับ';
  }
  clickConfirm(status) {
    var inputs = document.querySelectorAll('input');
    for (let index = 0; index < inputs.length; index++) {
      inputs[index].blur()
    }
    switch (status) {
      case 'buttonPhone':
        this.reqOtp();
        break;
      case 'buttonOPT':
        this.checkOtp();

        break;
      case 'buttonRegister':
        this.saveUsernamePassword();

        break;
      case 'buttonBank':
        this.saveBank();
        break;
    }
  }

  closeTag() {
    this.listBank = false;
    this.isBankName = false;
    this.buttonRegister = false;
    this.buttonCancel = false;
    this.Showcondition = false;
    this.inputShowHeader = false;
    this.inputOTP = false;
    this.inputPhone = false;
    this.inputUserName = false;
    this.inputPassword = false;
    this.inputNewPassword = false;
    this.inputConfirmPassword = false;
    this.inputFnameLname = false;
    this.inputBank = false;
    this.buttonPhone = false;
    this.buttonOPT = false;
    this.buttonBank = false;
    this.buttonSubmit = false;
  }

  setIntervalDelay(mobilePhone) {
    /** ลดวิที่หน่วง */
    const intervalDelay = setInterval(() => {
      this.delayMap[mobilePhone].time--;
      if (this.delayMap[mobilePhone].time <= 0) {
        clearInterval(this.delayMap[mobilePhone].interval);
      }
    }, 1000);
    return intervalDelay;
  }

  async onLogin() {

    try {
      const res = await this.httpSV.doAuth({
        username: this.username.toLocaleLowerCase().trim(),
        password: this.password.trim(),
      });
      if (res != null) {
        this.authSV.login(res.jwttoken, res.username);
        this.textErrorLogin = '';
      }
    } catch (error) {
      if (error.error.message == '') {
        this.textErrorLogin = 'User หรือ Password ไม่ถูกต้อง';
      } else {
        this.textErrorLogin = error.error.message;
      }
    }
  }
  /* 1. req otp */
  reqOtp() {
    this.showTextValiDate = '';
    /* เช็คเบอร์เท่ากับ 10 ตัว */
    if (this.mobilePhone.trim().length !== 10) {
      this.showTextValiDate = 'กรุณาระบุเบอร์โทร 10 หลักเท่านั้น';
      return;
    }
    /** validate username password */
    if (this.username.trim().length < 8 || this.username.trim().length > 12) {
      // console.error('USERNAME อย่างน้อย 8 ตัวและไม่เกิน 12 ตัว');
      this.showTextValiDate = 'USERNAME อย่างน้อย 8 ตัวและไม่เกิน 12 ตัว';
      return;
    }
    if (this.password.trim().length < 4) {
      this.showTextValiDate = 'Password อย่างน้อย 4 ตัว';
      console.error('Password อย่างน้อย 4 ตัว');
      return;
    }
    if (this.username.trim().length > 250) {
      this.showTextValiDate = 'Password ไม่เกิน 250 ตัว';
      console.error('Password ไม่เกิน 250 ตัว');
      return;
    }
    if ((this.delayMap[this.mobilePhone]?.time ?? 0) > 0) {
      return;
    }

    this.httpSV
      .doPost('web-player/register/get-otp', {
        phoneNumber: this.mobilePhone.trim(),
        username: this.username.trim(),
      })
      .subscribe(
        (res) => {
          if (MessageService.MSG.SUCCESS === res.status) {
            this.duplicateNumber = res.data.duplicateNumber;
            this.refCode = res.data.refCode;

            // //console.log("ผู้ใช้งานนี้ถูกใช้ไปแล้ว == ","ผู้ใช้งานนี้ถูกใช้ไปแล้ว" == res.message);

            if (this.duplicateNumber) {
              this.showTextValiDate = 'เบอร์ซ้ำกันในระบบ';
              return;
            } else if (res.data.nextRequestAble) {
              this.delayMap[this.mobilePhone] = {
                time: res.data.nextRequestAble,
                interval: this.setIntervalDelay(this.mobilePhone),
              };
              return;
            } else if (!res.data.duplicateNumber) {
              // ผ่าน
              this.state = 2;
              this.closeTag();
              this.check = false;
              this.showTextValiDate = '';
              this.buttonOPT = true;
              this.inputOTP = true;
              this.buttonCancel = true;
              this.tabIx = 2;
              this.textShowHeader = 'ยืนยันหมายเลขโทรศัพท์';
            } else {
              // duplicateNumber
              // เบอร์ซ้ำกันในระบบ
            }
          } else if ('ผู้ใช้งานนี้ถูกใช้ไปแล้ว' == res.message) {
            this.showTextValiDate = res.message;
            return;
          } else {
            /* หลังบ้านตาย */
          }
        },
        (error) => {
          /* ยังไปหลังบ้านไม่สำเร็จ */
          console.error(error);
        }
      );
  }
  /* 2. check otp */
  checkOtp() {
    this.httpSV
      .doPost('web-player/register/check-otp', {
        phoneNumber: this.mobilePhone.trim(),
        otp: this.otp.trim(),
      })
      .subscribe(
        (res) => {
          if (MessageService.MSG.SUCCESS === res.status) {
            if (res.data.status) {
              /** สำเร็จ */
              this.state = 3;
              this.closeTag();
              this.inputFnameLname = true;
              this.inputBank = true;
              this.listBank = true;
              this.buttonBank = true;
              this.showTextValiDate = '';
              this.textShowHeader = 'ลงทะเบียนธนาคาร';
              this.tabIx = 3;
            } else if (res.data.expire) {
              /** otp หมดอายุ */
              this.statusOtp = 'OTP หมดอายุ';
              this.showTextValiDate = 'OTP หมดอายุ';
              this.countWrongOtp++;
            } else {
              /** otp ไม่ถูกต้อง */
              //console.log('showTextValiDate', this.showTextValiDate);

              this.statusOtp = 'OTP ไม่ถูกต้อง';
              this.showTextValiDate = 'OTP ไม่ถูกต้อง';
              this.countWrongOtp++;
              this.countWrongOtp++;
            }

            /** ผิดสามครังครั้งแรก */
            if (this.countWrongOtp === this.countWrongRound) {
              this.state = 1;
              this.countWrongOtp = 1;
              this.countWrongOtp++;
              this.clickShowLogin();
            }
          } else {
            /**  หลังบ้านตาย */
          }
        },
        (error) => {
          /**  ยังไปหลังบ้านไม่สำเร็จ */
          console.error(error);
        }
      );
  }

  /** 3. save Username Password */
  saveUsernamePassword() {
    this.httpSV
      .doPost('web-player/register/lock-user', {
        username: this.username.trim(),
        mobilePhone: this.mobilePhone.trim(),
      })
      .subscribe(
        (res) => {
          if (MessageService.MSG.SUCCESS === res.status) {
            if (res.data != null) {
              this.showTextValiDate = '';
              this.textShowHeader = 'เลือกธนาคาร';
            } else {
              /** username ใช้แล้ว */
              this.showTextValiDate = 'username ใช้แล้ว';
              // console.error('username ใช้แล้ว');
            }
          } else {
            /**  หลังบ้านตาย */
          }
        },
        (error) => {
          /**  ยังไปหลังบ้านไม่สำเร็จ */
          console.error(error);
        }
      );
  }

  nextBank() {
    var inputs = document.querySelectorAll('input');
    for (let index = 0; index < inputs.length; index++) {
      inputs[index].blur()
    }
    if (this.bankCode == '' || this.bankCode == null) {
      this.showTextValiDate = 'กรุณาเลือกธนาคาร';
    } else if (this.bankAccount == '' || this.bankAccount == null) {
      this.showTextValiDate = 'กรุณากรอกเลขบัญชี';
    } else if (this.realName == '' || this.realName == null) {
      this.showTextValiDate = 'กรอกชื่อ - นามสกุล';
    } else {
      // this.register = '2';
      this.saveBank();
    }
  }

  back() {
    this.register = '1';
    this.closeTag();
    this.listBank = true;
    this.isBankName = true;
    this.inputFnameLname = true;
    this.inputBank = true;
    this.buttonBank = true;
    this.showTextValiDate = '';
  }

  /** 4. save bank */
  saveBank() {
    this.httpSV
      .doPostRegister('web-player/register/new', {
        username: this.username.toLowerCase().trim(),
        password: this.password.trim(),
        bankCode: this.bankCode,
        bankAccount: this.bankAccount.trim(),
        realName: this.realName,
        mobilePhone: this.mobilePhone,
        affiliateId: this.af,
      })
      .subscribe(
        (res) => {
          if (MessageService.MSG.SUCCESS === res.status) {
            if (res.data != null) {
              /** สำเร็จ */
              this.closeTag();
              this.onLogin();

              this.showTextValiDate = '';
              this.state = 5;
            } else {
              /** username ใช้แล้ว */
            }
          } else {
            /**  หลังบ้านตาย */
          }
        },
        (error) => {
          /**  ยังไปหลังบ้านไม่สำเร็จ */

          console.error(error);
        }
      );
  }
}
