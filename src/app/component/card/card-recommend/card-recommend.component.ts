import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'card-recommend',
  templateUrl: './card-recommend.component.html',
  styleUrls: ['./card-recommend.component.css']
})
export class CardRecommendComponent implements OnInit {
  @Input() header : string = '';
  @Input() detail : string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
