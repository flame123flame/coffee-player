import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(
    private router: Router,
  ) { }


  // ...
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('srb-token');
    // Check whether the token is expired and return
    // true or false
    return token != undefined && token != null;
  }

  login(token: string, username): void {

    localStorage.removeItem('srb-token');
    // ให้ค่าสถานะล็อกอินเป็น false
    localStorage.setItem('srb-token', token);
    //console.log(localStorage.getItem('srb-token'));
    localStorage.setItem('username', username);
    this.router.navigate(['/main']);
  }

  logout(): void {
    // ให้ค่าสถานะล็อกอินเป็น false
    localStorage.removeItem('srb-token');
    localStorage.removeItem('username')
    this.router.navigate(['login']);
  }
}
