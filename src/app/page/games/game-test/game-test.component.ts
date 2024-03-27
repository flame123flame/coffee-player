import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-test',
  templateUrl: './game-test.component.html',
  styleUrls: ['./game-test.component.css']
})
export class GameTestComponent implements OnInit {

  constructor() { }
  listGameMont: any[] = [
    {
      defaultHeight: null,
      defaultWidth: null,
      gameCode: 'd5qfgs4amfxf6',
      gameName: 'Respin Mania',
      gameType: 'GAMB',
      image1: '//img.zhenqinghua.com/gameimages/landscape/d5qfgs4amfxf6.png',
      image2: '//img.zhenqinghua.com/gameimages/portrait/d5qfgs4amfxf6.png',
      order: null,
      providerCode: 'JOKER',
      special: null,
    },
    {
      defaultHeight: null,
      defaultWidth: null,
      gameCode: "ahf5icfts455e",
      gameName: "Jin Fu Xing Yun",
      gameType: "GAMB",
      image1: "//img.zhenqinghua.com/gameimages/landscape/ahf5icfts455e.png",
      image2: "//img.zhenqinghua.com/gameimages/portrait/ahf5icfts455e.png",
      order: null,
      providerCode: "JOKER",
      special: null
    },
    {
      defaultHeight: null,
      defaultWidth: null,
      gameCode: "c41bsraonrmbq",
      gameName: "Xuan Pu Lian Huan",
      gameType: "GAMB",
      image1: "//img.zhenqinghua.com/gameimages/landscape/c41bsraonrmbq.png",
      image2: "//img.zhenqinghua.com/gameimages/portrait/c41bsraonrmbq.png",
      order: null,
      providerCode: "JOKER",
      special: null
    },
  ];
  ngOnInit(): void {
  }

}
