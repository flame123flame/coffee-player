import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalPromotionsComponent } from 'src/app/component/modal/modal-promotions/modal-promotions.component';
import { HttpService } from 'src/app/service/http.service';
import { RecommendComponent } from '../recommend/recommend.component';

@Component({
  selector: 'app-recommend004',
  templateUrl: './recommend004.component.html',
  styleUrls: ['./recommend004.component.css'],
})
export class Recommend004Component implements OnInit {
  dataAff: any;
  @ViewChild('showAlertContirmText', { static: true }) showAlertContirmText: ModalPromotionsComponent;
  isIncome: Boolean = true;
  income: any = 0;
  modalRef: BsModalRef;
  alertData:any={
    status:false
  }
listMenu:any = [
    {
      name: 'ช่องรายได้สะสม',
    },
    {
      name: 'ช่องรายไดปัจจุบัน',
    },
   
  ];
  constructor(
    private httpClient: HttpService,
    private router: Router,
    private recom: RecommendComponent,
    private modalService: BsModalService,
  ) {}

  ngOnInit(): void {
    this.recom.clickTap(4);

    this.getDashBoard();
  }
  openModal(){
    this.modalRef = this.modalService.show(this.showAlertContirmText, {
      class: 'modal-dialog-centered',
    });
  }

  getDashBoard() {
    this.httpClient.doGet('web-player/affiliate-player/withdraw-detail/' +localStorage.getItem('username')).subscribe((res) => {
        this.listMenu = [
          {
            name: 'รายได้สะสม',
            income:res.data.income
          },
          {
            name: 'รายได้ปัจจุบัน',
            income:res.data.totalIncome
          },
         
        ];
      });
  }
  closeModal() {
    this.modalRef.hide();
  }

  withdrawFn() {
    if (Number(this.income)) {
      this.httpClient.doPost('web-player/affiliate-player/withdraw-affiliate', {
          username: localStorage.getItem('username'),
          amount: this.income
        }).subscribe((res) => {
          this.recom.tabIdx = 1;
          this.alertData.status = true
          this.income = 0
          this.openModal()
  
        });
    } else {
      this.isIncome = false;
    }
  }
  
}
