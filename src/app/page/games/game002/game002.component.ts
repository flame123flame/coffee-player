import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game002',
  templateUrl: './game002.component.html',
  styleUrls: ['./game002.component.css']
})
export class Game002Component implements OnInit {
  listGames: any[] = [
    { text: "", url: "./assets/image/sub-mpg-ggaming2x.png", favorite: true },
    { text: "", url: "./assets/image/sub-mpg-cq92x.png", favorite: false },
  ]
  constructor() { }

  ngOnInit(): void {
  }
  favorite(index) {
    this.listGames[index].favorite = !this.listGames[index].favorite
  }
}
