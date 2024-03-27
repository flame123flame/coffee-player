import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpService } from 'src/app/service/http.service';
import { MessageService } from 'src/app/service/message.service';
import { NewPasswordComponent } from '../new-password/new-password.component';
import { RegisterUserComponent } from '../register-user/register-user.component';
declare var $: any;
@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  readonly countWrongRound = 3;
  1;
  statusOtp: string;
  otp: string;
  status = 1;
  username: string;
  refCode: any;
  countWrongOtp = 0;
  showTextValiDate: string;
  delayMap = {};
  isShow = true;
  req: any;
  textHeader = 'หน้าลืมรหัสผ่าน';
  constructor(
    public registerUser: RegisterUserComponent,
    private authSV: AuthService,
    private httpSV: HttpService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder
  ) {}
  mobilePhone: string;
  ngOnInit(): void {
    // //console.log("delayMap[mobilePhone].time",this.delayMap[this.mobilePhone].time);
  }
  getStatus(status) {
    this.registerUser.register = status;
  }

  sendPhoneNew() {
    this.status = 2;
    if (this.mobilePhone.length !== 10) {
      console.error('กรุณาระบุเบอร์โทรให้ครบ 10 หลัก');
      this.showTextValiDate = 'กรุณาระบุเบอร์โทรให้ครบ 10 หลัก';
      return;
    }
    this.showTextValiDate = '';

    if ((this.delayMap[this.mobilePhone]?.time ?? 0) > 0) {
      return;
    }

    this.httpSV
      .doPut(
        'web-player/customer/forgot-password/' +
          this.mobilePhone +
          '/' +
          this.username,
        {}
      )
      .subscribe(
        (res) => {
          if (MessageService.MSG.SUCCESS === res.status) {
            this.showTextValiDate = '';
            if (res.data.nextRequestAble) {
              this.delayMap[this.mobilePhone] = {
                time: res.data.nextRequestAble,
                interval: this.setIntervalDelay(this.mobilePhone),
              };
              return;
            } else if (!res.data.duplicateNumber) {
              this.textHeader = 'กรอก OTP';
              this.isShow = false;
            }
          } else if (res.message == 'Username is not detected') {
            this.showTextValiDate = 'Username ไม่ถูกต้อง';
          } else if (res.message == 'Phone number is not detected') {
            this.showTextValiDate = 'เบอร์โทรศัพท์ไม่ถูกต้อง';
          } else if (
            res.message == 'Username and Phone number is not detected'
          ) {
            this.showTextValiDate = 'Username ไม่ถูกต้อง';
          }
        },
        (error) => {
          /* ยังไปหลังบ้านไม่สำเร็จ */
          console.error(error);
        }
      );
  }

  sendPhone() {
    this.status = 1;
    if (this.mobilePhone.length !== 10) {
      console.error('กรุณาระบุเบอร์โทรให้ครบ 10 หลัก');
      this.showTextValiDate = 'กรุณาระบุเบอร์โทรให้ครบ 10 หลัก';
      return;
    }
    this.showTextValiDate = '';

    if ((this.delayMap[this.mobilePhone]?.time ?? 0) > 0) {
      return;
    }

    this.httpSV
      .doPut(
        'web-player/customer/forgot-password/' +
          this.mobilePhone +
          '/' +
          this.username,
        {}
      )
      .subscribe(
        (res) => {
          if (MessageService.MSG.SUCCESS === res.status) {
            this.showTextValiDate = '';
            this.refCode = res.data.refCode;
            if (res.data.nextRequestAble) {
              this.delayMap[this.mobilePhone] = {
                time: res.data.nextRequestAble,
                interval: this.setIntervalDelay(this.mobilePhone),
              };
              return;
            } else if (!res.data.duplicateNumber) {
              this.textHeader = 'กรอก OTP';
              this.isShow = false;
            }
          } else if (res.message == 'Username is not detected') {
            this.showTextValiDate = 'Username ไม่ถูกต้อง';
          } else if (res.message == 'Phone number is not detected') {
            this.showTextValiDate = 'เบอร์โทรศัพท์ไม่ถูกต้อง';
          } else if (
            res.message == 'Username and Phone number is not detected'
          ) {
            this.showTextValiDate = 'Username ไม่ถูกต้อง';
          }
        },
        (error) => {
          /* ยังไปหลังบ้านไม่สำเร็จ */
          console.error(error);
        }
      );
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
              this.registerUser.register = '4';
              this.registerUser.phone = this.mobilePhone;
              this.showTextValiDate = '';
            } else if (res.data.expire) {
              /** otp หมดอายุ */
              this.statusOtp = 'OTP หมดอายุ';
              this.showTextValiDate = 'OTP หมดอายุ';
              this.countWrongOtp++;
            } else {
              /** otp ไม่ถูกต้อง */
              this.statusOtp = 'OTP ไม่ถูกต้อง';
              this.showTextValiDate = 'OTP ไม่ถูกต้อง';
              this.countWrongOtp++;
              this.countWrongOtp++;
            }

            /** ผิดสามครังครั้งแรก */
            if (this.countWrongOtp === this.countWrongRound) {
              this.isShow = false;
              this.countWrongOtp = 1;
              this.countWrongOtp++;
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
