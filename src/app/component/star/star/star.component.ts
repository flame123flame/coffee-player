import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit {
  @Input() star : number = 0;
  listStar: any[] = [];
  colors:any;
  constructor() { }

  ngOnInit(): void {
    this.star = Number(this.star);
    for (let index = 1; index < 6; index++) {
      if(index < this.star+1){
        this.colors= "#FFDE0C";
      } else{
        this.colors= "";
      }
      this.listStar.push({color: this.colors});
    }


  }

}
