import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { MessageService } from 'src/app/service/message.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { RegisterUserComponent } from '../register-user/register-user.component';

@Component({
  selector: 'new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css'],
})
export class NewPasswordComponent implements OnInit {
  @Input() public phoneNumberss: string = '';
  readonly countWrongRound = 3;
  statusOtp: string;
  otp: string;
  countWrongOtp = 0;
  showTextValiDate: string;
  newPassword: string;
  phoneNumber: string;
  recentPassword: string;
  constructor(
    public registerUser: RegisterUserComponent,
    private httpSV: HttpService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.phoneNumber = this.registerUser.phone;
  }
  getStatus(status) {
    this.registerUser.register = status;
  }

  sendPhone() {
    if (this.newPassword.length < 4) {
      this.showTextValiDate = 'Password อย่างน้อย 4 ตัว';
      console.error('Password อย่างน้อย 4 ตัว');
      return;
    }

    if (this.newPassword !== this.recentPassword) {
      this.showTextValiDate = 'Password ไม่ตรงกัน';
      console.error('Password ไม่ตรงกัน');
      return;
    }

    this.httpSV
      .doPut('web-player/customer/reset-password ', {
        phoneNumber: this.phoneNumber,
        newPassword: this.newPassword,
      })
      .subscribe(
        (res) => {
          if (MessageService.MSG.SUCCESS === res.status) {
            this.registerUser.register = '1';
          } else {
          }
        },
        (error) => {
          /* ยังไปหลังบ้านไม่สำเร็จ */
          console.error(error);
        }
      );
  }
}
