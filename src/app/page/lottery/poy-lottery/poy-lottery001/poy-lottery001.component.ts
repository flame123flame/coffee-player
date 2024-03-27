import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalPromotionsComponent } from 'src/app/component/modal/modal-promotions/modal-promotions.component';
import { HttpService } from 'src/app/service/http.service';
import { MessageService } from 'src/app/service/message.service';
import { PoyLotteryComponent } from '../poy-lottery.component';

@Component({
  selector: 'app-poy-lottery001',
  templateUrl: './poy-lottery001.component.html',
  styleUrls: ['./poy-lottery001.component.css']
})
export class PoyLottery001Component implements OnInit {
  modalRef: BsModalRef;
  text:any;
  isShowImage = true;
  @ViewChild('showAlertContirmText', { static: true }) showAlertContirmText: ModalPromotionsComponent;
  @ViewChild('showAlertContirm', { static: true }) showAlertContirm: ModalPromotionsComponent;
isShow = true;
  constructor(
    private router: Router,
    private httpClient: HttpService,
    private  poy:PoyLotteryComponent,
    // private poyLotteryComponent : PoyLotteryComponent,
      private modalService: BsModalService,
   
  ) { 
    this.getData();
  }
  roundYeekee:any;
  codeTan:any;
  Classcode:any;
  lottoCategoryCode:any;
 
  list: any[] = [

  ]
  ngOnInit(): void {
    this.poy.isshow = true;
    // this.poyLotteryComponent.wording = 'ดูโพยล่าสุด';
    this.poy.setTap()
  }
  refund() {
    if(this.lottoCategoryCode == "YEEKEE"){
      this.httpClient.doGet( "lotto/refund-lotto/" + this.codeTan+"/"+ this.Classcode+"?"+`roundYeekee=${this.roundYeekee}`).subscribe(res => {
        if(MessageService.MSG.SUCCESS == res.data){
          this.isShowImage = true;
          this.closeModal();
          this.text = "คืนโพยสำเร็จ"
          this.getData()
          this.openModal();
         }else if(MessageService.MSG.NOT_PENDING_STATUS == res.data){
          this.isShowImage = false;
          this.closeModal();
           this.text = "สถานะโพยนี้ไม่ใช่รอหวยออก"
           //console.log("NOT_PENDING_STATUS(สถานะโพยนี้ไม่ใช่รอหวยออก)");
          this.openModal();
         }else if(MessageService.MSG.TIME_OUT_TYPE == res.data){
          this.isShowImage = false;
          this.closeModal();
          this.text = "หมดเวลาคืนหวยนี้แล้ว/หวยนี้คืนได้ กี่ชมก่อนหวยออก"
          this.openModal();
         }else if(MessageService.MSG.TIME_OUT_TRANSACTION == res.data){
          this.isShowImage = false;
          this.closeModal();
          this.text = "หมดเวลาคืนหวยโพยนี้แล้ว/ชม.หลังซื้อ"
          this.openModal();
        }else if("OVER_COUNT" == res.data){
          this.isShowImage = false;
          this.closeModal();
          this.text = "คืนโพยเกินกำหนด"
          this.openModal();
        }
      })
    }else{
      this.httpClient.doGet("lotto/refund-lotto/" + this.codeTan+"/"+ this.Classcode).subscribe(res => {
        if(MessageService.MSG.SUCCESS == res.data){
          this.isShowImage = true;
          this.closeModal();
          this.text = "คืนโพยสำเร็จ"
          this.getData()
          this.openModal();
         }else if(MessageService.MSG.NOT_PENDING_STATUS == res.data){
          this.isShowImage = false;
          this.closeModal();
           this.text = "สถานะโพยนี้ไม่ใช่รอหวยออก"
           //console.log("NOT_PENDING_STATUS(สถานะโพยนี้ไม่ใช่รอหวยออก)");
          this.openModal();
         }else if(MessageService.MSG.TIME_OUT_TYPE == res.data){
          this.isShowImage = false;
          this.closeModal();
          this.text = "หมดเวลาคืนหวยนี้แล้ว/หวยนี้คืนได้ กี่ชมก่อนหวยออก"
          this.openModal();
         }else if(MessageService.MSG.TIME_OUT_TRANSACTION == res.data){
          this.isShowImage = false;
          this.closeModal();
          this.text = "หมดเวลาคืนหวยโพยนี้แล้ว/ชม.หลังซื้อ"
          this.openModal();
        }else if("OVER_COUNT" == res.data){
          this.isShowImage = false;
          this.closeModal();
          this.text = "คืนโพยเกินกำหนด"
          this.openModal();
        }
      })
    }
  }
  closeModal() {
    this.modalRef.hide()

  }

  openModal() {
    this.modalRef = this.modalService.show(this.showAlertContirm, {
      class: 'modal-dialog-centered'
    });
  }

  openAlertContirmTextModal(isOpening,codeTan,Classcode,roundYeekee,lottoCategoryCode) {
    this.roundYeekee = roundYeekee
    this.lottoCategoryCode = lottoCategoryCode
    this.codeTan = codeTan;
    this.Classcode = Classcode;
    if (isOpening) {
      this.closeModal()
    }
    this.modalRef = this.modalService.show(this.showAlertContirmText, {
      class: 'modal-dialog-centered'
    });
  }

  onClickEdit(code,lottoClassName) {
    //console.log("555555",code);
    this.router.navigate(['lottery/poy-lotto/poyLottery001detail'], {queryParams: { code: code,lottoClassName:lottoClassName}});
 
  }
  getData() {
    this.httpClient.doGetLotto("transaction-group/get-transaction-group-by-user-pending").subscribe(res => {
      if(res.data.length != 0 && res.data != null){

        this.isShow = true;
        this.list = res.data  
        for (let index = 0; index < this.list.length; index++) {   
             this.list[index].lottoTransactionGroupCodeSend = this.list[index].lottoTransactionGroupCode
          this.list[index].lottoTransactionGroupCode = this.list[index].lottoTransactionGroupCode.split("-",1); 
    
          
        }
  
      }else{
        this.isShow = false;
      }
    })
  }
}
