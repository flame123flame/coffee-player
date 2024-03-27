import { Component, OnInit } from '@angular/core';
import { GameLotteryComponent } from '../game-lottery.component';

@Component({
  selector: 'app-game-lotto004',
  templateUrl: './game-lotto004.component.html',
  styleUrls: ['./game-lotto004.component.css']
})
export class GameLotto004Component implements OnInit {
  listData: any = [
    { text: "กติกาหวย", code: "001", active: false, data: [], range: [] },
    {
      text: "สามตัวบน + โต๊ด", code: "002", active: false,
      data: [
        { text: "สามตัวบน (800)", active: false },
        { text: "สามตัวโต๊ด (130)", active: false },
      ],
      range: [
        { text: "000", active: false },
        { text: "100", active: false },
        { text: "200", active: false },
        { text: "300", active: false },
        { text: "400", active: false },
        { text: "500", active: false },
        { text: "600", active: false },
        { text: "700", active: false },
        { text: "800", active: false },
        { text: "900", active: false },
      ]
    },
    {
      text: "สามตัวหน้า + ล่าง", code: "003", active: false,
      data: [
        { text: "สามตัวหน้า", active: false },
        { text: "สามตัวล่าง", active: false },
      ],
      range: [
        { text: "000", active: false },
        { text: "100", active: false },
        { text: "200", active: false },
        { text: "300", active: false },
        { text: "400", active: false },
        { text: "500", active: false },
        { text: "600", active: false },
        { text: "700", active: false },
        { text: "800", active: false },
        { text: "900", active: false },
      ]
    },
    {
      text: "สองตัวบน + ล่าง", code: "004", active: false, data: [
        { text: "สองตัวบน (90)", active: false },
        { text: "สองตัวล่าง (90)", active: false }
      ], range: [
        { text: "00", active: false },
      ]
    },
    { text: "เลขวิ่ง", code: "005", active: false, data: [], range: [] },
    { text: "เลขชุด / ดึงโพย", code: "006", active: false, data: [], range: [] },
  ]
  type: any = 0
  list100: any[] = []
  list100Select: any[] = []
  typeSelect: any[] = []
  active100: Boolean = false;
  constructor(
    private gameLotto: GameLotteryComponent
  ) { }

  ngOnInit(): void {

  }
  ngOnDestroy(): void {
   
  }

}
