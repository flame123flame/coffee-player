import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { PoyLotteryComponent } from '../poy-lottery.component';

@Component({
  selector: 'app-poy-lottery006',
  templateUrl: './poy-lottery006.component.html',
  styleUrls: ['./poy-lottery006.component.css']
})
export class PoyLottery006Component implements OnInit {
  list: any[] = [
  ]
  isShow = true;
  code:any;
  lottoName: any;
  constructor(    private router: Router,
    private httpClient: HttpService,
    private formBuilder: FormBuilder,
    private  poy:PoyLotteryComponent,
    private poyLotteryComponent : PoyLotteryComponent,
    private route: ActivatedRoute) {
      this.code = this.route.snapshot.queryParams['code'];
      if (this.code != null) {
        this.getData();
  
      } 
     }

  ngOnInit(): void {
    this.lottoName = this.route.snapshot.queryParams['lottoName'];
    this.poy.setTap()
    this.poyLotteryComponent.isshow = true;
    this.poyLotteryComponent.wording = 'ดูโพยย้อนหลัง'
  
  }

  onClickEdit(code,lottoCategoryCode,lottoClassName) {
    this.router.navigate(['lottery/poy-lotto/poyLottery002detail'], {queryParams: { code: code,
      lottoName:lottoClassName,
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
          lottoCategoryCode:data.lottoCategoryCode,
          createAt: data.createAt,
   
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
