import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game005',
  templateUrl: './game005.component.html',
  styleUrls: ['./game005.component.css']
})
export class Game005Component implements OnInit {
  listGames: any[] = [
    { text: "", url: "./assets/image/sub-animal-sv@2x.png", favorite: false },
    { text: "", url: "./assets/image/sub-animal-trc@2x.png", favorite: true },
  ]
  constructor() { }

  ngOnInit(): void {
  }
  favorite(index) {
    this.listGames[index].favorite = !this.listGames[index].favorite
  }
}
