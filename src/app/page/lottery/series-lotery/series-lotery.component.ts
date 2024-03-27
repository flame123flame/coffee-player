import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalPromotionsComponent } from 'src/app/component/modal/modal-promotions/modal-promotions.component';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-series-lotery',
  templateUrl: './series-lotery.component.html',
  styleUrls: ['./series-lotery.component.css']
})
export class SeriesLoteryComponent implements OnInit {
  username: any;
  tabIdx1 = 0;
  tabIdx2 = 0;
  id:any;
  listGroup: any[] = []
  modalRef: BsModalRef;
  @ViewChild('showAlertContirmText', { static: true }) showAlertContirmText: ModalPromotionsComponent;
  constructor(private router: Router,  private httpClient: HttpService,  private modalService: BsModalService,) { }

  ngOnInit(): void {
 
    this.username = localStorage.getItem("username");
    this.getGroup();
  }
  closeModal() {
    this.modalRef.hide()

  }

  gotoTotalLoto(){
  
    this.router.navigate(["/lottery/poy-lotto/poyLottery005"])
  }
  openAlertContirmTextModal(isOpening,id) {
    this.id = id;
    if (isOpening) {
      this.closeModal()
    }
    this.modalRef = this.modalService.show(this.showAlertContirmText, {
      class: 'modal-dialog-centered'
    });
  }
  gotoDetail(id){
    this.router.navigate(['lottery/series-lotery/seriesLotery001'], {queryParams: { id: id}});
  }
  delete() {
    this.httpClient.doDelete("lotto-group-number/" + this.id).subscribe(res => {
      this.closeModal()
      this.getGroup();
    })
  }
  gotoAdd(){
    this.router.navigate(['lottery/series-lotery/seriesLotery002'], {});
  }

  getGroup() {
    this.httpClient.doGet("lotto-group-number/get-by-username/" + this.username).subscribe(res => {
      this.listGroup = res.data
    
    })
  }


}
