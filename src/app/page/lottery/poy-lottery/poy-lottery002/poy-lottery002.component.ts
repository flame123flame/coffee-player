import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { PoyLotteryComponent } from '../poy-lottery.component';

@Component({
  selector: 'app-poy-lottery002',
  templateUrl: './poy-lottery002.component.html',
  styleUrls: ['./poy-lottery002.component.css']
})
export class PoyLottery002Component implements OnInit {
  list: any[] = [
  ]
  isShowPoy = true;
  code:any;
  lottoName:any;
  constructor(    private router: Router,
    private httpClient: HttpService,
    private formBuilder: FormBuilder,
    private  poy:PoyLotteryComponent,
    private poyLotteryComponent : PoyLotteryComponent,
    private route: ActivatedRoute) {
      this.code = this.route.snapshot.queryParams['code'];
      this.lottoName = this.route.snapshot.queryParams['lottoName'];
      if (this.code != null) {
        this.getData();
  
      } 
     }

  ngOnInit(): void {
    this.poyLotteryComponent.isshow = true;
    this.poy.setTap()

    this.poyLotteryComponent.wording = 'ดูโพยย้อนหลัง';

  
  }

  back() {
    this.router.navigate(['/recommend/recommend-user-tab2']);
  }

  onClickEdit(code,lottoCategoryCode,lottoClassName) {
    console.log("lottoCategoryCode =",lottoCategoryCode);
    
    this.router.navigate(['lottery/poy-lotto/poyLottery002detail'], {queryParams: { code: code,
      lottoName:lottoClassName,
      lottoCategoryCode:lottoCategoryCode,
    status:"detail"}});
 
  }
  getData() {
    this.httpClient.doGetLotto("transaction-group/get-transaction-group-by-user-show/"+this.code).subscribe(res => {
      if(res.data.length != 0 && res.data != null){
        this.isShowPoy = true;
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
          poy: "ดูโพย", unpoy: "คืนโพย"
        })
      });
    } else{
      this.isShowPoy = false;
    }


      //console.log(res.data);
    })
  }
}
