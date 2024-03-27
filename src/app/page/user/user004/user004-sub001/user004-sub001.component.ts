import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-user004-sub001',
  templateUrl: './user004-sub001.component.html',
  styleUrls: ['./user004-sub001.component.css'],
})
export class User004Sub001Component implements OnInit {
  isShow = true;
  username: any;
  listData: any[] = [];
  constructor(
    private modalService: BsModalService,
    public dialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder,
    private httpClient: HttpService
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.gitHistory();
  }

  gitHistory() {
    this.httpClient
      .doPost('web-player/player-history/get-history', {
        username: this.username,
        period: 'CURRENT',
      })
      .subscribe((res) => {
        if (res.data.length != 0) {
          this.isShow = true;
          let historyTypeText;
          let color;
          let orderId;
          res.data.forEach((data) => {
            orderId = data.orderId.split('-', 1);

            if (data.historyType == 'LOSE') {
              historyTypeText = 'แทงพนัน';
              color = 'color01';
            } else if (data.historyType == 'WIN') {
              historyTypeText = 'ชนะพนัน';
              color = 'color02';
            } else if (data.historyType == 'DEPOSIT') {
              historyTypeText = 'แจ้งฝากเครดิต';
              color = 'color03';
            } else if (data.historyType == 'WITHDRAW') {
              historyTypeText = 'แจ้งถอนเคดิต';
              color = 'color04';
            } else if (data.historyType == 'PROMOTION') {
              historyTypeText = 'โบนัสฝากเงิน';
              color = 'color05';
            } else if (data.historyType == 'CASHBACK') {
              historyTypeText = 'โบนัสยอดเสีย';
              color = 'color06';
            } else if (data.historyType == 'REBATE') {
              historyTypeText = 'โบนัสคืนเงิน';
              color = 'color07';
            }
            this.listData.push({
              color: color,
              orderId: orderId,
              orderIdSend: data.orderId,
              balanceCredit: data.balanceCredit,
              credit: data.credit,
              historyType: historyTypeText,
              remark: data.remark,
              transactionDate: data.transactionDate,
            });
          });
          this.listData.sort((a, b) =>
            a.transactionDate < b.transactionDate
              ? 1
              : b.transactionDate < a.transactionDate
              ? -1
              : 0
          );
        } else {
          this.isShow = false;
        }
      });
  }
  tab01() {}
  tab02() {}
}
