import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { BsModalService } from 'ngx-bootstrap/modal';
import { HttpService } from 'src/app/service/http.service';
import { MessageService } from 'src/app/service/message.service';
import { PoyLotteryComponent } from '../poy-lottery.component';

@Component({
  selector: 'app-poy-lottery005',
  templateUrl: './poy-lottery005.component.html',
  styleUrls: ['./poy-lottery005.component.css']
})
export class PoyLottery005Component implements OnInit {
  username: any;
  list: any[] = []
   date: Date = new Date(); 
   dateFormat:string;
  dateNow: string;
  constructor(
    private router: Router,
    private httpClient: HttpService,
      private modalService: BsModalService,
      private poyLotteryComponent : PoyLotteryComponent,
  ) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("username")
    this.getData();  this.poyLotteryComponent.setTap()
  }

  getData(){
    this.httpClient.doGetLotto("lotto-web-transaction/get-transaction-web/" + this.username).subscribe(res => {
      if(MessageService.MSG.SUCCESS == res.status){
        this.list = res.data;
        for (let index = 0; index < this.list.length; index++) {
            this.list[index].day =  moment(this.list[index].day).format("DD/MM/YYYY")
          
        }
      
      }
   
    
    })
 
  }
  

}
