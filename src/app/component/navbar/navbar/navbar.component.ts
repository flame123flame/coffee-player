import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() showImage: Boolean = false;
  @Input() text: String = 'สมัครสมาชิก';

  @Output() onClickEvent: EventEmitter<any> = new EventEmitter();
  @Output() onClickEventLogin: EventEmitter<any> = new EventEmitter();
  @Output() onClickEventMenu: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    //console.log("showImage",this.showImage);

  }
  refresh(): void {
    window.location.reload();
  }
  click() {
    this.onClickEvent.emit();
  }
  clickMenu() {
    this.onClickEventMenu.emit();
  }
  CliclLogin() {
    this.onClickEventLogin.emit();
  }
}
