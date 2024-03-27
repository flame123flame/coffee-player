import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpService } from 'src/app/service/http.service';
import { MessageService } from 'src/app/service/message.service';

@Component({
  selector: 'app-just-logic',
  templateUrl: './just-logic.component.html',
  styleUrls: ['./just-logic.component.css'],
})
export class JustLogicComponent implements OnInit {
  /** send API */
  mobilePhone: string;
  otp: string;
  username: string;
  password: string;
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
  statusOtp = '';
  countWrongOtp = 0;
  delayMap = {};

  constructor(private authSV: AuthService, private httpSV: HttpService) {}

  ngOnInit(): void {}

  logOut() {
    this.authSV.logout();
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

  /* 1. req otp */
  reqOtp() {
    /* เช็คเบอร์เท่ากับ 10 ตัว */
    if (this.mobilePhone.length !== 10) {
      console.error('กรุณาระบุเบอร์โทรให้ครบ 10 หลัก');
      return;
    }

    if ((this.delayMap[this.mobilePhone]?.time ?? 0) > 0) {
      return;
    }

    /** Call API */
    this.httpSV
      .doPost('web-player/register/get-otp', {
        phoneNumber: this.mobilePhone,
      })
      .subscribe(
        (res) => {
          if (MessageService.MSG.SUCCESS === res.status) {
            this.duplicateNumber = res.data.duplicateNumber;
            this.refCode = res.data.refCode;
            if (this.duplicateNumber) {
              console.error('เบอร์ซ้ำกันในระบบ');
              return;
            } else if (res.data.nextRequestAble) {
              this.delayMap[this.mobilePhone] = {
                time: res.data.nextRequestAble,
                interval: this.setIntervalDelay(this.mobilePhone),
              };
              return;
            }
            if (!res.data.duplicateNumber) {
              this.state = 2;
            } else {
              // duplicateNumber
              // เบอร์ซ้ำกันในระบบ
            }
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
        phoneNumber: this.mobilePhone,
        otp: this.otp,
      })
      .subscribe(
        (res) => {
          if (MessageService.MSG.SUCCESS === res.status) {
            if (res.data.status) {
              /** สำเร็จ */
              this.state = 3;
            } else if (res.data.expire) {
              /** otp หมดอายุ */
              this.statusOtp = 'otp หมดอายุ';
              this.countWrongOtp++;
            } else {
              /** otp ไม่ถูกต้อง */
              this.statusOtp = 'otp ไม่ถูกต้อง';
              this.countWrongOtp++;
            }

            /** ผิดสามครังครั้งแรก */
            if (this.countWrongOtp === this.countWrongRound) {
              this.state = 1;
              this.countWrongOtp = 1;
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
    /** validate username password */
    if (this.username.length < 8 || this.username.length > 12) {
      console.error('USERNAME อย่างน้อย 8 ตัวและไม่เกิน 12 ตัว');
      return;
    }
    if (this.password !== this.recentPassword) {
      console.error('Password ไม่ตรงกัน');
      return;
    }
    if (this.username.length < 4) {
      console.error('Password อย่างน้อย 4 ตัว');
      return;
    }
    if (this.username.length > 250) {
      console.error('Password ไม่เกิน 250 ตัว');
      return;
    }
    this.httpSV
      .doPost('web-player/register/lock-user', {
        username: this.username,
        mobilePhone: this.mobilePhone,
      })
      .subscribe(
        (res) => {
          if (MessageService.MSG.SUCCESS === res.status) {
            if (res.data != null) {
              /** สำเร็จ */
              this.state = 4;
            } else {
              /** username ใช้แล้ว */
              console.error('username ใช้แล้ว');
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

  /** 4. save bank */
  saveBank() {
    this.httpSV
      .doPost('web-player/register/new', {
        username: this.username,
        password: this.password,
        bankCode: this.bankCode,
        bankAccount: this.bankAccount,
        realName: this.realName,
        mobilePhone: this.mobilePhone,
      })
      .subscribe(
        (res) => {
          if (MessageService.MSG.SUCCESS === res.status) {
            if (res.data != null) {
              /** สำเร็จ */
              this.state = 5;
            } else {
              /** username ใช้แล้ว */
              console.error('err');
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
