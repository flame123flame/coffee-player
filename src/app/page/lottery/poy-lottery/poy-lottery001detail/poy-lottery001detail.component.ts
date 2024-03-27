import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { PoyLotteryComponent } from '../poy-lottery.component';

@Component({
  selector: 'app-poy-lottery001detail',
  templateUrl: './poy-lottery001detail.component.html',
  styleUrls: ['./poy-lottery001detail.component.css']
})
export class PoyLottery001detailComponent implements OnInit {
  code: any;
  codeText: any;
  sumBet: any;
  sumPrizeWin: any;
  lottoClassName: any;
  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpService,
    private router: Router,
    private route: ActivatedRoute,
    private poyLotteryComponent : PoyLotteryComponent,
  ) { }
  list: any[] = [
  ]
  ngOnInit(): void { 
    // lottoName
    
    this.lottoClassName = this.route.snapshot.queryParams['lottoClassName'];
    this.poyLotteryComponent.isshow = false;
    this.code = this.route.snapshot.queryParams['code'];
    this.codeText = this.route.snapshot.queryParams['code'];
    // this.codeText = this.codeText.split("-",1); 
    //console.log("awd", this.code );
    if (this.code != null) {
      this.onClick();

    } 
  }
  back() {
    this.router.navigate(['/lottery/poy-lotto/poyLottery001'],{ queryParams: { } });
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
          kindName: data.kindName,
          correctNumber : data.correctNumber ,
          lottoNumber: data.lottoNumber,
          payCost: data.payCost,
          prize: data.prize,
          prizeResult: data.prizeResult,
          status:data.status
        // status:"WIN",
        // status:"REFUND",
        // status:"WIN",
        // status:"LOSE"
        })
      });
    })
  }
}
