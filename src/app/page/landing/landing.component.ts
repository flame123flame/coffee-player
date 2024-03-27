import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { AuthService } from 'src/app/auth/auth.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  formRegister: FormGroup;
  constructor(
    private httpSV: HttpService,
    private authSV: AuthService,
  ) {

  }

  ngOnInit(): void {
  }

  async onLogin() {
    const res = await this.httpSV.doAuth({
      username: 'admin',
      password: 'password',
    });
    if (res != null) {
      this.authSV.login(res.jwttoken, res.username);
    }
  }

}
