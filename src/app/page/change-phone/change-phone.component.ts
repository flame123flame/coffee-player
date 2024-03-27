import { Component, OnInit } from '@angular/core';
import { RegisterUserComponent } from '../register-user/register-user.component';

@Component({
  selector: 'app-change-phone',
  templateUrl: './change-phone.component.html',
  styleUrls: ['./change-phone.component.css']
})
export class ChangePhoneComponent implements OnInit {

  constructor(public registerUser : RegisterUserComponent ) { }

  ngOnInit(): void {
  }
  getStatus(status){
    this.registerUser.register = status;
  }
}
