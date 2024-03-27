import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'card-profile-bank',
  templateUrl: './card-profile-bank.component.html',
  styleUrls: ['./card-profile-bank.component.css']
})
export class CardProfileBankComponent implements OnInit {
  @Input() imagePath : string = '';
  @Input() widthImage : string = '';
  
  constructor() { }

  ngOnInit(): void {
  }

}
