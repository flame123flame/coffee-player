import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-modal-promotions',
  templateUrl: './modal-promotions.component.html',
  styleUrls: ['./modal-promotions.component.css']
})
export class ModalPromotionsComponent implements OnInit {
  public static MODAL_SIZE = {
    SMALL: 'modal-sm',
    LARGE: 'modal-lg',
    MEDUIM: 'modal-md',
    EXTRA_LARGE: 'modal-xl',
  }
  public static MODAL_ACTION = {
    CONFIRM: 'confirm',
    CLOSE: 'close',
  }

  @ViewChild('modalCustom', { static: true }) mymodal: ElementRef;
  public modalRef: BsModalRef;

  @Input() header: string = '';
  @Input() body: string = 'กรุณายืนยันการทำรายการ';
  @Input() footer: string = '';

  @Output() onConfirm: EventEmitter<any> = new EventEmitter();
  @Output() onClose: EventEmitter<any> = new EventEmitter();
  constructor(private modalService: BsModalService) { }


  ngOnInit() {
    ////console.log("header : ", this.header);
  }

  openModal(className: string = ModalPromotionsComponent.MODAL_SIZE.SMALL) {
    this.modalRef = this.modalService.show(this.mymodal, { class: className });
  }
  close() {
    this.modalRef.hide();
  }
  onClick(key) {
    this.modalRef.hide();
    switch (key) {
      case 'confirm':
        this.onConfirm.emit();
        break;
      case 'close':
        this.onClose.emit();
        break;
      default:
        break;
    }
  }
}
