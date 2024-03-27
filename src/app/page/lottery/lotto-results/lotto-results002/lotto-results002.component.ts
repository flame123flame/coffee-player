import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { HttpService } from 'src/app/service/http.service';
import { LottoResultsComponent } from '../lotto-results.component';

@Component({
  selector: 'app-lotto-results002',
  templateUrl: './lotto-results002.component.html',
  styleUrls: ['./lotto-results002.component.css']
})
export class LottoResults002Component implements OnInit {
  lottoCategoryCode = 'THAI';
  lottoSubCategoryCode = 1
  dateNow: string;
  list: any[] = [];
  listDroup: any[] = [];
  listSubDroup: any[] = [];
  listDetail: any[] = [];
  listYeekee: any[] = [];
  listShow: any[] = [];
  tabIdx1 = 1;
  tabIdx2 = 0;
  DIGIT_BOT3: string[]=[]
  DIGIT_BOT3SHOW:string;
  roundYeekee = 1;
  DIGIT_TOP3:any
  DIGIT_BOT2:any;
  DIGIT_FRONT3: string[]=[]
  DIGIT_FRONT3_SHOW: string;
  constructor(
    private httpClient: HttpService,
    private lotto : LottoResultsComponent
  ) { }

  ngOnInit(): void {
    this.lotto.setTap()
    this.dateNow = moment(new Date()).format("YYYY-MM-DD");
    this.getList(null);
    this.getDroup();
  }
  changeList(status){
    this.listSubDroup = []
    var res = status.target.value.split("_", 1);
    let dataCeck;
    dataCeck = res[0]
        if(dataCeck == "YEEKEE"){
          this.httpClient.doGetLotto(`lotto-result/get-round-yeekee-by-class-code?lottoClassCode=${status.target.value}`).subscribe(res => {
            this.listSubDroup = res.data;
          })
        }
    this.getList(dataCeck);
  }

  changeListSub(){
    this.getList("YEEKEE")
  }
  getDroup(){
    this.httpClient.doGetLotto(`lotto-result/get-all-class-list-lotto-result`).subscribe(res => {
      this.listDroup = res.data;
    })
  }
  getList(dataCeck) {
    this.list = [];
    this.listShow = []
    this.DIGIT_TOP3 = null;
    this.DIGIT_BOT2 = null
    this.DIGIT_BOT3SHOW = null
    this.DIGIT_FRONT3_SHOW= null
    this.DIGIT_BOT3SHOW = null
    this.DIGIT_FRONT3_SHOW = null
    this.DIGIT_FRONT3  =[]
    this.DIGIT_BOT3  =[]
    this.listYeekee=[]
    const date = new Date(2020, 7, 1)

      if(dataCeck != "YEEKEE"){
        this.httpClient.doGetLotto("lotto-result/get-lotto-result-by-lotto-class-code/"+this.lottoCategoryCode).subscribe(res => {
          this.list = res.data;
          this.listDetail = res.data
          for (let index = 0; index < this.list.length; index++) {
            let newDate = new Date(this.list[index].lottoResultInstallment);
            const result = newDate.toLocaleDateString('th-TH', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
           this.list[index].convertDate =  result;
          }
        })
        }else{
          
          this.httpClient.doGetLotto("lotto-result/get-lotto-result-yeekee-by-round/"+this.lottoCategoryCode+"/"+this.roundYeekee).subscribe(res => {
            this.list = res.data;
            this.listDetail = res.data
            for (let index = 0; index < this.list.length; index++) {
              let newDate = new Date(this.list[index].installment);
              const result = newDate.toLocaleDateString('th-TH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
             this.list[index].convertDate =  result;
            }
          })
        }
  
  }

  clickTab01(){
    this.tabIdx1 = 1;
    this.tabIdx2 = 0;
  }
  clickTab02(){
    this.tabIdx1 = 0;
    this.tabIdx2 = 2;
  }
}

