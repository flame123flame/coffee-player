import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { PoyLotteryComponent } from '../poy-lottery.component';
import { Location } from '@angular/common';
@Component({
  selector: 'app-poy-lottery002detail',
  templateUrl: './poy-lottery002detail.component.html',
  styleUrls: ['./poy-lottery002detail.component.css']
})
export class PoyLottery002detailComponent implements OnInit {
  list: any[] = [
  ]
  code: any;
  sumBet: any;
  sumPrizeWin: any;
  lottoName: any;
  status: any;
  lottoCategoryCode: any;
  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private httpClient: HttpService,
    private router: Router,
    private route: ActivatedRoute,
    private poyLotteryComponent:  PoyLotteryComponent
  ) { }

  ngOnInit(): void {
    this.lottoCategoryCode = this.route.snapshot.queryParams['lottoCategoryCode'];
    this.code = this.route.snapshot.queryParams['code'];
    this.lottoName = this.route.snapshot.queryParams['lottoName'];
    this.status = this.route.snapshot.queryParams['status'];
    if (this.status == "detail") {
      this.poyLotteryComponent.isshow = false;
    } 
    if (this.code != null) {
      this.onClick();

    } 
  }

  back() {
    this.location.back();
  }
  onClick(){
    this.httpClient.doGetLotto("transaction-group/get-transaction-detail-by-code/" + this.code ).subscribe(res => {
      this.sumBet = res.data.sumBet
      this.sumPrizeWin =  res.data.sumPrizeWin
      res.data.listTrantsaction.forEach(data => {
        if(data.correctNumber == "PENDING" ){
          data.correctNumber = "-"
        }
        this.list.push({
          correctNumber:data.correctNumber,
          kindName: data.kindName,
          lottoNumber: data.lottoNumber,
          payCost: data.payCost,
          prize: data.prize,
          prizeResult: data.prizeResult,
          status:data.status
        })
      });
    })
  }
}
