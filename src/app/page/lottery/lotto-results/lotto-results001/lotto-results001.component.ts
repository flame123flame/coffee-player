import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { HttpService } from 'src/app/service/http.service';
import { LottoResultsComponent } from '../lotto-results.component';

@Component({
  selector: 'app-lotto-results001',
  templateUrl: './lotto-results001.component.html',
  styleUrls: ['./lotto-results001.component.css']
})
export class LottoResults001Component implements OnInit {
  expression = false;
  dateNow: string;
  list: any[] = [];
  listStock: any[] = [];
  listDetail: any[] = [];
  listYeekee: any[] = [];
  listShow: any[] = [];
  listShowTable: any[] = [];

  digit2BotLottoNumberTable:any;
  digit3TopLottoNumberTable:any;
  roundYekeeTable:any;
  roundYeekee:any;
  digit2BotLottoNumber:any;
  digit3TopLottoNumber:any;
  tabIdx1 = 1;
  tabIdx2 = 0;
  list100: any[] = [];
  DIGIT_BOT3: string[] = []
  DIGIT_BOT3SHOW: string;
  DIGIT_TOP3: any
  DIGIT_BOT2: any;
  DIGIT_FRONT3: string[] = []
  DIGIT_FRONT3_SHOW: string;
  constructor(
    private httpClient: HttpService,
    private lotto: LottoResultsComponent
  ) { }

  ngOnInit(): void {
    this.lotto.setTap()
    this.dateNow = moment(new Date()).format("YYYY-MM-DD");
    this.getList();
    this.getListYeekee();
    this.getListStock();
  }
  getListYeekee(){
    this.list100 = []
    this.digit2BotLottoNumber = null;
    this.digit2BotLottoNumber= null;
    this.digit3TopLottoNumber= null;
    this.digit2BotLottoNumberTable= null;
    this.digit3TopLottoNumberTable= null;
    this.roundYekeeTable= null;
    this.roundYeekee= null;
    this.httpClient.doGetLotto(`lotto-result/get-lotto-yeekee-result-by-installment?installament=${this.dateNow}`).subscribe(res => {
      this.listYeekee = res.data

      for (let index = 0; index < this.listYeekee.length; index++) {
        if(index == 0){
          this.listYeekee[index].active = true
        }else{
          this.listYeekee[index].active = false
        }
        let newDate = new Date(this.listYeekee[index].installment);
        const result = newDate.toLocaleDateString('th-TH', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
        this.listYeekee[index].convertDate = result;
        if(this.listYeekee[index].lottoClassCode == "YEEKEE"){
          this.listShow = this.listYeekee[index].lottoList
          this.listShowTable  = this.listYeekee[index].lottoList
        }
     
        for (let index2 = this.listShow.length-1;index2 >=0; index2--) {
          if( this.listShow[index2].digit2BotLottoNumber != null ){
            this.digit2BotLottoNumber = this.listShow[index2].digit2BotLottoNumber;
            this.digit3TopLottoNumber = this.listShow[index2].digit3TopLottoNumber;
            this.roundYeekee = this.listShow[index2].roundYeekee;
            break;
          }
        }

      }
      for (let index3 = 0; index3 < this.listShowTable.length; index3++) {
        this.list100.push({number:this.listShowTable[index3].roundYeekee
        ,digit2BotLottoNumber:this.listShowTable[index3].digit2BotLottoNumber,
        digit3TopLottoNumber:this.listShowTable[index3].digit3TopLottoNumber})
        if(index3 == 0){
          this.list100[index3].active = true
        }else{
          this.list100[index3].active = false 
        }
      }
     
    })
   
  }
  clickActiveTable(idx) {
    
    let checkNoOne = 0;
    for (let index = 0; index < this.list100.length; index++) {
      if (index == idx) {
        this.list100[index].active = true;
        checkNoOne++;
        this.digit2BotLottoNumberTable =  this.list100[index].digit2BotLottoNumber
        this.digit3TopLottoNumberTable =  this.list100[index].digit3TopLottoNumber
        this.roundYekeeTable = this.list100[index].number
      } else {
        this.list100[index].active = false;
      }
    }
  }
  goToForGame(idx,itemYee) {
    this.list100 = []
    this.digit2BotLottoNumber = null;
    this.digit2BotLottoNumber= null;
    this.digit3TopLottoNumber= null;
    this.digit2BotLottoNumberTable= null;
    this.digit3TopLottoNumberTable= null;
    this.roundYekeeTable= null;
    this.roundYeekee= null;
    let checkNoOne = 0;
    for (let index = 0; index < this.listYeekee.length; index++) {
      if (index == idx) {
        this.listYeekee[index].active = true;
        checkNoOne++;
      } else {
        this.listYeekee[index].active = false;
      }
    }

    for (let index = 0; index < this.listYeekee.length; index++) {
      this.list100 = []
        if(itemYee == "YEEKEE"){
          if(this.listYeekee[index].lottoClassCode == "YEEKEE"){
            this.listShow = this.listYeekee[index].lottoList
            this.listShowTable  = this.listYeekee[index].lottoList
          }
       
          for (let index2 = this.listShow.length-1;index2 >=0; index2--) {
            if( this.listShow[index2].digit2BotLottoNumber != null ){
              this.digit2BotLottoNumber = this.listShow[index2].digit2BotLottoNumber;
              this.digit3TopLottoNumber = this.listShow[index2].digit3TopLottoNumber;
              this.roundYeekee = this.listShow[index2].roundYeekee;
              break;
            }
          }
        }else{
          this.list100 = []
          if(this.listYeekee[index].lottoClassCode != "YEEKEE"){
            this.listShow = this.listYeekee[index].lottoList
            this.listShowTable  = this.listYeekee[index].lottoList
          }
         
          for (let index2 = this.listShow.length-1;index2 >=0; index2--) {
            if( this.listShow[index2].digit2BotLottoNumber != null ){
              this.digit2BotLottoNumber = this.listShow[index2].digit2BotLottoNumber;
              this.digit3TopLottoNumber = this.listShow[index2].digit3TopLottoNumber;
              this.roundYeekee = this.listShow[index2].roundYeekee;
              break;
            }
          }
        }
        for (let index3 = 0; index3 < this.listShowTable.length; index3++) {
          this.list100.push({number:this.listShowTable[index3].roundYeekee
          ,digit2BotLottoNumber:this.listShowTable[index3].digit2BotLottoNumber,
          digit3TopLottoNumber:this.listShowTable[index3].digit3TopLottoNumber})
          if(index3 == 0){
            this.list100[index3].active = true
          }else{
            this.list100[index3].active = false 
          }
        }
    }
    this.digit2BotLottoNumberTable =  this.list100[0].digit2BotLottoNumber
    this.digit3TopLottoNumberTable =  this.list100[0].digit3TopLottoNumber

  }
  getListStock() {
    this.httpClient.doGetLotto(`lotto-result/get-lotto-result-stocks?installment=${this.dateNow}`).subscribe(res => {
      this.listStock = res.data;
    
      for (let index = 0; index < this.listStock.length; index++) {
     
        let newDate = new Date(this.listStock[index].installment);
        const result = newDate.toLocaleDateString('th-TH', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
        this.listStock[index].convertDate = result;
      }
   
    })
 
  }
  getList() {
    this.listShow = []

    this.DIGIT_FRONT3 = []
    this.DIGIT_BOT3 = []
    this.listYeekee = []
    const date = new Date(2020, 7, 1)
    this.httpClient.doGetLotto(`lotto-result/get-lotto-result-by-date?installment=${this.dateNow}`).subscribe(res => {
      this.list = res.data;
      for (let index = 0; index < this.list.length; index++) {
        if (this.list[index].lottoCategoryCode == 'YEEKEE') {
          this.listYeekee.push(this.list[index])
        }
      }
      for (let index = 0; index < this.list.length; index++) {
        if (this.list[index].lottoCategoryCode == 'GOVERNMENT') {
          this.listDetail = this.list[index].lottoList
        }
        let newDate = new Date(this.list[index].installment);
        const result = newDate.toLocaleDateString('th-TH', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
        this.list[index].convertDate = result;
      }
   
    })
 
  }

  clickTab01() {
    this.expression = false
    this.tabIdx1 = 1;
    this.tabIdx2 = 0;
  }
  clickTab02() {
    this.clickActiveTable(0)
    this.expression = true
   
    this.tabIdx1 = 0;
    this.tabIdx2 = 2;
  }
}

