import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { PoyLotteryComponent } from '../poy-lottery.component';

@Component({
  selector: 'app-poy-lottery004',
  templateUrl: './poy-lottery004.component.html',
  styleUrls: ['./poy-lottery004.component.css']
})
export class PoyLottery004Component implements OnInit {

  list: any[] = [
  ]
  isShow = true;
  code:any;
  lottoName: any;
  constructor(    private router: Router,
    private httpClient: HttpService,
    private formBuilder: FormBuilder,
    private poyLotteryComponent : PoyLotteryComponent,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.lottoName = this.route.snapshot.queryParams['lottoName'];
    this.poyLotteryComponent.wording = 'ดูโพยย้อนหลัง'
    this.poyLotteryComponent.setTap()
    this.poyLotteryComponent.isshow = true;
    this.code = this.route.snapshot.queryParams['code'];
    if (this.code != null) {
      this.getData();

    } 
 
  }
  onClickEdit(code,lottoCategoryCode) {
    this.router.navigate(['lottery/poy-lotto/poyLottery002detail'], {queryParams: { code: code,
      lottoName:this.lottoName,
      lottoCategoryCode:lottoCategoryCode,
    status:"detail"}});
 
  }
  getData() {
    this.httpClient.doGetLotto("transaction-group/get-transaction-group-by-user-show/"+this.code).subscribe(res => {
      if(res.data.length != 0){
        this.isShow = true;
       let  lottoTransactionGroupCode;
      res.data.forEach(data => {
        lottoTransactionGroupCode = data.lottoTransactionGroupCode.split("-",1); 
        this.list.push({
          lottoTransactionGroupCodeSend: data.lottoTransactionGroupCode,
          lottoTransactionGroupCode: lottoTransactionGroupCode,
          lottoCategoryName: data.lottoCategoryName,
          createAt: data.createAt,
          lottoCategoryCode:data.lottoCategoryCode,
          sumBet: data.sumBet,
          sumPrizeWin: data.sumPrizeWin,
          lottoClassName:data.lottoClassName,
          status: data.status,
          remark:data.remark, 
          roundYeekee:data.roundYeekee,
          poy: "ดูโพย", unpoy: "คืนโพย"
        })
      });
    } else{
      this.isShow = false;
    }


      //console.log(res.data);
    })
  }
}
