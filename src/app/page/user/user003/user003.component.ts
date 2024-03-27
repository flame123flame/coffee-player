import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutComponent } from 'src/app/common/layout/layout.component';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-user003',
  templateUrl: './user003.component.html',
  styleUrls: ['./user003.component.css'],
})
export class User003Component implements OnInit {
  listNotification: any[] = [];
  listNotificationBackUp: any[] = [];
  viewStatus: any = 'all';
  readStatusIs: Boolean = true;
  readStatus: any = 'UNREAD';
  webMessage: any;

  @Output() messageEvent = new EventEmitter<string>();

  constructor(
    private router: Router,
    private httpClient: HttpService,
    private layout: LayoutComponent
  ) {}

  ngOnInit(): void {
    this.getMessage(true);
  }
  getMessage(isSwitch) {
    this.httpClient
      .doGet(
        'web-player/inbox-message/get-send-message-by-username/' +
          localStorage.getItem('username')
      )
      .subscribe((res) => {
        if (null != res.data) {
          this.listNotification = res.data;
          this.listNotificationBackUp = res.data;
          // this.findRead(isSwitch)
        }
      });
  }
  deleteMessage(code) {
    this.httpClient
      .delete(
        'web-player/inbox-message/delete-message/' +
          code +
          '/' +
          localStorage.getItem('username')
      )
      .subscribe((res) => {
        this.getMessage(true);
      });
  }
  findRead(isSwitch) {
    let backup = [];
    this.listNotification = this.listNotificationBackUp;
    if (isSwitch) {
      if (this.readStatusIs) {
        this.readStatus = 'UNREAD';
      } else {
        this.readStatus = 'READ';
      }
      this.readStatusIs = !this.readStatusIs;
    }
    this.listNotification.forEach((res) => {
      if (this.readStatus == res.status) {
        if (res.messageType == this.viewStatus) {
          backup.push(res);
        } else if (this.viewStatus == 'all') {
          backup.push(res);
        }
      }
    });
    this.listNotification = backup;
  }
  findView() {
    let backup = [];
    this.listNotification = this.listNotificationBackUp;
    if (this.viewStatus == 'all') {
      this.viewStatus = 'NORMAL';
      this.listNotification.forEach((res) => {
        if (res.messageType == 'NORMAL') {
          // if (res.messageType == "NORMAL" && this.readStatus == res.status) {
          backup.push(res);
        }
      });
      this.listNotification = backup;
    } else if (this.viewStatus == 'NORMAL') {
      this.viewStatus = 'POMOTION';
      this.listNotification.forEach((res) => {
        if (res.messageType == 'POMOTION') {
          // if (res.messageType == "POMOTION" && this.readStatus == res.status) {
          backup.push(res);
        }
      });
      this.listNotification = backup;
    } else {
      this.viewStatus = 'all';
      // If you need to Read/Unread Function UnComment this line below.   vvvvvv
      this.listNotification = this.listNotificationBackUp;
      // this.findRead(false)
      // If you need to Read/Unread Function UnComment ^^^^^^^
    }
  }
  routSandCode(item) {
    this.router.navigate(['/promotion/promotion-detail'], {
      queryParams: {
        promoCode: item.promotion.promoCode,
        promoBanner: item.promotion.promoBanner,
        promoDetail: item.promotion.promoDetail,
      },
    });
    this.httpClient
      .doPost('web-player/inbox-message/trigger-message', {
        username: localStorage.getItem('username'),
        messageCode: item.messageCode,
      })
      .subscribe((res) => {
        this.layout.getMessage();
      });
  }
  slideCard(distance, item) {
    if (Math.abs(distance.x) >= 130) {
      this.httpClient
        .doPost('web-player/inbox-message/trigger-message', {
          username: localStorage.getItem('username'),
          messageCode: item.messageCode,
        })
        .subscribe((res) => {
          this.getMessage(false);
          this.layout.getMessage();
        });
    }
  }
  deleteAll() {
    this.httpClient
      .doPost('web-player/inbox-message/delete-message/', {
        username: localStorage.getItem('username'),
        messageCode: "ALL",
      })
      .subscribe((res) => {
        this.layout.getMessage();
      });
  }
  goToMessage(item) {
    localStorage.setItem('message', item.webMessage);
    this.router.navigate(['/user/user003-detail'], {
      queryParams: {
        subject: item.subject,
        promoTitle: item.promotion.promoTitle,
        createdDate: item.createdDate,
      },
    });
    this.httpClient
      .doPost('web-player/inbox-message/trigger-message', {
        username: localStorage.getItem('username'),
        messageCode: item.messageCode,
      })
      .subscribe((res) => {
        this.layout.getMessage();
      });
  }
}
