import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';

import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalPromotionsComponent } from 'src/app/component/modal/modal-promotions/modal-promotions.component';
@Component({
  selector: 'app-user001',
  templateUrl: './user001.component.html',
  styleUrls: ['./user001.component.css'],
})
export class User001Component implements OnInit {
  @ViewChild('showModal', { static: true }) showModal: ModalPromotionsComponent;
  username: any;
  oldPass: any;
  newPass: any;
  newPassEnter: any;
  formSave: FormGroup;
  modalRef: BsModalRef;

  birthday: any;
  firstName: any;
  lastName: any;
  mail: any;
  nickName: any;
  tel: any;

  isWrong: any = null;
  fieldTextType1: Boolean = false;
  fieldTextType2: Boolean = false;
  fieldTextType3: Boolean = false;
  listDay: Number[] = [];
  listMM: Number[] = [];
  listYYYY: Number[] = [];
  dd: any;
  mm: any;
  yy: any;
  alertText: any;
  isSuccess: Boolean = false;
  constructor(
    private router: Router,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private httpClient: HttpService
  ) {
    this.formSave = this.formBuilder.group({
      oldPass: [''],
      newPass: [''],
      newPassEnter: [''],
    });
  }

  ngOnInit(): void {
    this.getUser();
    this.setData();
  }
  closeModal() {
    this.modalRef.hide();
  }
  openModal() {
    this.modalRef = this.modalService.show(this.showModal, {
      class: 'modal-dialog-centered',
    });
  }
  getUser() {
    this.httpClient
      .doGet(
        'web-player/customer/get-customer-by-id/' +
        localStorage.getItem('username')
      )
      .subscribe((res) => {
        this.username = res.data.username;
        this.tel = res.data.mobilePhone;
        this.mail = res.data.email;
        this.nickName = res.data.nickname;
        this.firstName = res.data.realName.split(' ')[0].trim() + ' ' + res.data.realName.split(' ')[1].trim();
        this.lastName = res.data.realName.split(' ')[1].trim();
        this.dd = res.data.birthday?.split('-')[2];
        this.mm = res.data.birthday?.split('-')[1];
        this.yy = res.data.birthday?.split('-')[0];
        localStorage.setItem('mobilePhone', this.tel);
        localStorage.setItem('email', this.mail);
        localStorage.setItem('realName', res.data.realName);
        // this.username = localStorage.getItem('username')
        // this.tel = localStorage.getItem('mobilePhone')
        // this.firstName = localStorage.getItem('realName')
      });
  }
  setData() {
    for (let index = 0; index < 31; index++) {
      this.listDay.push(index + 1);
      if (index < 12) {
        this.listMM.push(index + 1);
      }
    }

    for (
      let index = new Date().getFullYear();
      index > new Date().getFullYear() - 100;
      index--
    ) {
      this.listYYYY.push(index);
    }
  }
  toggleFieldTextType1() {
    this.fieldTextType1 = !this.fieldTextType1;
  }
  toggleFieldTextType2() {
    this.fieldTextType2 = !this.fieldTextType2;
  }
  toggleFieldTextType3() {
    this.fieldTextType3 = !this.fieldTextType3;
  }
  selectDay(e) {
    this.dd = e;
  }
  selectMM(e) {
    this.mm = e;
  }
  selectYYYY(e) {
    this.yy = e;
  }
  postNewPassword() {
    //console.log(this.formSave.value);
    this.birthday = new Date(this.mm + '/' + this.dd + '/' + this.yy);
    let data = {
      birthday: this.birthday,
      firstName: this.firstName,
      lastName: this.lastName,
      mail: this.mail,
      newPassword: null,
      nickName: this.nickName,
      oldPassword: null,
      username: this.username,
    };
    if (this.formSave.value.newPass.length > 0) {
      if (this.formSave.value.newPass.length >= 4) {
        if (this.formSave.value.newPass == this.formSave.value.newPassEnter) {
          data.newPassword = this.formSave.value.newPass;
          data.oldPassword = this.formSave.value.oldPass;
          this.postSave(data);
        } else {
          this.isWrong = 'รหัสยืนยันต้องตรงกัน';
        }
      } else {
        this.isWrong = 'กรุณากรอกรหัสผ่าน';
      }
    } else {
      this.postSave(data);
    }
  }
  goToPath(path) {
    this.router.navigate([path]);
  }
  postSave(data) {
    this.httpClient
      .doPut('customer/change-password', {
        newPassword: data.newPassword,
        oldPassword: data.oldPassword,
        birthday: data.birthday,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.mail,
        nickName: data.nickName,
        username: data.username,
      })
      .subscribe((res) => {
        this.alertText = res.message;
        if (res.status == 'SUCCESS') {
          this.isSuccess = true;

          this.router.navigate(['/profile']);
        } else {
          this.isSuccess = false;
        }
        this.openModal();
      });
  }
}
