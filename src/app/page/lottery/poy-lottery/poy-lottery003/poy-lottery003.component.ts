import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { PoyLotteryComponent } from '../poy-lottery.component';

@Component({
  selector: 'app-poy-lottery003',
  templateUrl: './poy-lottery003.component.html',
  styleUrls: ['./poy-lottery003.component.css']
})
export class PoyLottery003Component implements OnInit {

  list: any[] = [
  ]
  isShow = true;
  code:any;
  lottoName: any;
  constructor(    private router: Router,
    private httpClient: HttpService,
    private formBuilder: FormBuilder,
    private poyLotteryComponent : PoyLotteryComponent,
    private route: ActivatedRoute) {
      this.lottoName = this.route.snapshot.queryParams['lottoName'];
      this.code = this.route.snapshot.queryParams['code'];
      if (this.code != null) {
        this.getData();
  
      } 
     }

  ngOnInit(): void {
    this.poyLotteryComponent.isshow = true;
    this.poyLotteryComponent.setTap()
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
          createAt: data.createAt,
          sumBet: data.sumBet,
          lottoCategoryCode:data.lottoCategoryCode,
          sumPrizeWin: data.sumPrizeWin,
          lottoClassName:data.lottoClassName,
          status: data.status,
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
