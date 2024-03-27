import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CommonService } from './common.service';

@Injectable()
export class HttpService {
  private API_URL: string = environment.BASE_URL + '/api';
  private BASE_URL: string = environment.BASE_URL;
  private LOTTO_URL: string = environment.LOTTO_URL + '/api';

  private userToken: string;
  statusGet = 0
  statusGetTemp = 0
  countAuth = 0
  timeout = 45000
  constructor(
    private commonService: CommonService,
    private httpClient: HttpClient,
    private router: Router,
    private authService: AuthService,
  ) { }

  private getHttpHeaders(): HttpHeaders {
    // if (!this.userToken)
    //   this.userToken = localStorage.getItem('srb-token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('srb-token')}`
    });
  }

  doAuth<T>(body: any): any {
    return new Promise<T | any>((resolve, reject) => {
      this.httpClient.post(
        `${this.BASE_URL}/token/generate-token/web`,
        body,
        { headers: { 'Content-Type': 'application/json' } },
      )
        .subscribe(
          (res) => { resolve(res); },
          (error) => { reject(error); },
        );
    });
  }

  refreshToken<T>(): any {
    return new Promise<T | any>((resolve, reject) => {
      this.httpClient.get(
        `${this.BASE_URL}/token/refreshtoken`,
        {
          headers: {
            'Content-Type': 'application/json',
            isRefreshToken: 'true',
            Authorization: `Bearer ${localStorage.getItem('srb-token')}`
          }
        },
      )
        .subscribe(
          (res) => {
            resolve(res);
          },
          (error) => { reject(error); },
        );
    });
  }
  delete(path, hasCalled = false) {
    if (!hasCalled)
      this.commonService.loading();
    return this.httpClient.delete(`${this.API_URL}/${path}`, { headers: this.getHttpHeaders() }).pipe(
      timeout(this.timeout), map((res: any) => {
        this.commonService.unLoading();
        return res;
      }),
      catchError((err, caught) => {
        return this.doHandleError(err, caught, hasCalled, this.delete(path, true));
      })
    );
  }

  doGet(url, hasCalled = false) {
    if (!hasCalled)
      this.commonService.loading();
    return this.httpClient.get(`${this.API_URL}/${url}`, { headers: this.getHttpHeaders() }).pipe(
      timeout(this.timeout), map((res: any) => {
        this.commonService.unLoading();
        return res;
      }),
      catchError((err, caught) => {
        return this.doHandleError(err, caught, hasCalled, this.doGet(url, true));
      })
    );
  }

  doGetLotto(url, hasCalled = false) {
    if (!hasCalled)
      this.commonService.loading();
    return this.httpClient.get(`${this.LOTTO_URL}/${url}`, { headers: this.getHttpHeaders() }).pipe(
      timeout(this.timeout), map((res: any) => {
        this.commonService.unLoading();
        return res;
      }),
      catchError((err, caught) => {
        return this.doHandleError(err, caught, hasCalled, this.doGetLotto(url, true));
      })
    );
  }

  doPost(url, data, hasCalled = false) {
    if (!hasCalled)
      this.commonService.loading();
    return this.httpClient.post(`${this.API_URL}/${url}`, data, { headers: this.getHttpHeaders() }).pipe(
      timeout(this.timeout),
      map((res: any) => {
        this.commonService.unLoading();
        return res;
      }),
      catchError((err, caught) => {
        return this.doHandleError(err, caught, hasCalled, this.doPost(url, data, true));
      })
    );
  }
  doPostRegister(url, data, hasCalled = false) {
    if (!hasCalled)
      this.commonService.loading();
    return this.httpClient.post(`${this.API_URL}/${url}`, data, {}).pipe(
      map((res: any) => {
        this.commonService.unLoading();
        return res;
      }),
      catchError((err, caught) => {
        return this.doHandleError(err, caught, hasCalled, this.doPostRegister(url, data, true));
      })
    );
  }
  doPostLotto(url, data, hasCalled = false) {
    if (!hasCalled)
      this.commonService.loading();
    return this.httpClient.post(`${this.LOTTO_URL}/${url}`, data, { headers: this.getHttpHeaders() }).pipe(
      timeout(this.timeout),
      map((res: any) => {
        this.commonService.unLoading();
        return res;
      }),
      catchError((err, caught) => {
        return this.doHandleError(err, caught, hasCalled, this.doPostLotto(url, data, true));
      })
    );
  }

  doDelete(url, hasCalled = false) {
    if (!hasCalled)
      this.commonService.loading();
    return this.httpClient.delete(`${this.API_URL}/${url}`, { headers: this.getHttpHeaders() }).pipe(
      timeout(this.timeout), map((res: any) => {
        this.commonService.unLoading();
        return res;
      }),
      catchError((err, caught) => {
        return this.doHandleError(err, caught, hasCalled, this.doDelete(url, true));
      })
    );
  }

  doPut(url, data, hasCalled = false) {
    if (!hasCalled)
      this.commonService.loading();
    return this.httpClient.put(`${this.API_URL}/${url}`, data, { headers: this.getHttpHeaders() }).pipe(
      timeout(this.timeout), map((res: any) => {
        this.commonService.unLoading();
        return res;
      }),
      catchError((err, caught) => {
        return this.doHandleError(err, caught, hasCalled, this.doPut(url, data, true));
      })
    );
  }

  doPatch(url, data, hasCalled = false) {
    if (!hasCalled)
      this.commonService.loading();
    return this.httpClient.patch(`${this.API_URL}/${url}`, data, { headers: this.getHttpHeaders() }).pipe(
      timeout(this.timeout), map((res: any) => {
        this.commonService.unLoading();
        return res;
      }),
      catchError((err, caught) => {
        return this.doHandleError(err, caught, hasCalled, this.doPatch(url, data, true));
      })
    );
  }

  // private doHandleError = (err, caught) => {
  //   this.commonService.unLoading();
  //   if (err.status === 401) {
  //     this.authService.logout();
  //   } else if (err.status === 524) {
  //     // this.router.routeReuseStrategy.shouldReuseRoute = function () {
  //     //   return false;
  //     // };
  //     location.reload()
  //   }

  //   return Promise.reject(err.message || err);
  // }

  private async doHandleError(err, caught, hasCalled, funcCallAgain) {
    if (!hasCalled)
      this.commonService.unLoading();
    if (err.status === 401) {
      if (this.countAuth == 0) {
        this.countAuth++
        const res = await this.refreshToken()
        if (res != null) {
          this.authService.login(res.jwttoken, res.username);
        }
        // location.reload()
      } else {
        this.authService.logout();
        this.countAuth = 0
      }
    } else if (err.status === 404 && !hasCalled) {
      console.log('funcCallAgain');
      return funcCallAgain;
    } else if (err.status === 524 && !hasCalled) {
      return funcCallAgain;
    } else if (err.toString().indexOf("TimeoutError") >= 0) {   //  Timeout error
      location.reload()
    }
    return Promise.reject(err.message || err);
  }

}
