import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { HttpService } from 'src/app/service/http.service';
import { LottoResultsComponent } from '../lottery/lotto-results/lotto-results.component';

@Component({
  selector: 'app-lottery-results-ohter',
  templateUrl: './lottery-results-ohter.component.html',
  styleUrls: ['./lottery-results-ohter.component.css']
})
export class LotteryResultsOhterComponent implements OnInit {
  resultLottoGOVERNMENT: any[] = [];
  resultLottoSTOCKS: any[] = [];
  resultLottoYEEKEE: any[] = [];
  listShow: any[] = [];
  roundYeekee:any;
  image:any;
  tabIdx1 = 1;
  tabIdx2 = 0;
  list100: any[] = [];
  digit2BotLottoNumber:any;

  expression = false;
  dateNow: string;
  list: any[] = [];
  listDetail: any[] = [];
  listYeekee: any[] = [];

  listShowTable: any[] = [];

  digit2BotLottoNumberTable:any;
  digit3TopLottoNumberTable:any;
  roundYekeeTable:any;
  digit3TopLottoNumber:any;
  constructor(
    private httpClient: HttpService
  ) { }

  ngOnInit(): void {
    this.getResultLotto();
  }
  refresh(): void {
    window.location.reload();
  }
    getResultLotto(){
      this.httpClient.doGetLotto("web-lotto-result/get-lotto-result").subscribe(res => {
        //รัฐบาล
        this.resultLottoGOVERNMENT = res.data;
        for (let index = 0; index < this.resultLottoGOVERNMENT.length; index++) {
          
          let newDate = new Date(this.resultLottoGOVERNMENT[index].installment);
          const result = newDate.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
          this.resultLottoGOVERNMENT[index].convertDate = result;
      
        }

     
      
      })
      this.httpClient.doGetLotto("web-lotto-result/get-lotto-result-stocks").subscribe(res => {
        //หวยหุ้น
        this.resultLottoSTOCKS = res.data;
        
        for (let index = 0; index < this.resultLottoSTOCKS.length; index++) {
          
          let newDate = new Date(this.resultLottoSTOCKS[index].installment);
      
          
          const result = newDate.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
          this.resultLottoSTOCKS[index].convertDate = result;
        }
      })
      
      this.httpClient.doGetLotto("web-lotto-result/get-lotto-result-yeekee").subscribe(res => {
        // ยี่กี
        this.listYeekee = res.data;
        this.image = res.data[0].lottoFlag
        for (let index = 0; index < this.listYeekee.length; index++) {
          if(index == 0){
            this.listYeekee[index].active = true
          }else{
            this.listYeekee[index].active = false
          }

          // var date1 = moment(this.listYeekee[index].installment,"DD/MM/YYYY").format('YYYY-MM-DD');
          let newDate = new Date(this.listYeekee[index].installment);
          const result = newDate.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
          
          this.listYeekee[index].convertDate = result;
          if(this.listYeekee[index].lottoClassCode == "YEEKEE"){
            this.listShow = this.listYeekee[index].yeekeeList
            this.listShowTable  = this.listYeekee[index].yeekeeList
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
              this.listShow = this.listYeekee[index].yeekeeList
              this.listShowTable  = this.listYeekee[index].yeekeeList
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
              this.listShow = this.listYeekee[index].yeekeeList
              this.listShowTable  = this.listYeekee[index].yeekeeList
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
  
  