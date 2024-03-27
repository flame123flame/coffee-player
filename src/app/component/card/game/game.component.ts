import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @Output() onClickEvent: EventEmitter<any> = new EventEmitter();
  @Input() imagePath : string = '';
  @Input() backgroup : string = '';
  @Input() showImage : Boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  click(){
    this.onClickEvent.emit();
  }

}
