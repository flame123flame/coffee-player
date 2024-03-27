import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register001',
  templateUrl: './register001.component.html',
  styleUrls: ['./register001.component.css']
})
export class Register001Component implements OnInit {

  textShowHeader = "เข้าสู่ระบบ";
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
  constructor() { }

  ngOnInit(): void {
  }

  clickRegister(){
    this.buttonPhone = true;
    this.buttonSubmit = false;
    this.buttonOPT = false;
    this.inputShowHeader = false;
    this.inputUserName = false;
    this.inputPassword = false;
    this.inputPhone = true;
    this.textShowHeader = "สมัครสมาชิก";

  }
  clickConfirm(status){
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
    switch (status) {
      case 'buttonPhone':

        break;
      case 'buttonOPT':

        break;
      case 'buttonBank':

        break;
     
    }

  }

}
