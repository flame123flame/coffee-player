import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { RecommendComponent } from '../recommend/recommend.component';

@Component({
  selector: 'app-recommend002detail',
  templateUrl: './recommend002detail.component.html',
  styleUrls: ['./recommend002detail.component.css'],
})
export class Recommend002detailComponent implements OnInit {
  @Input() tabIdx: number = 2;
  listGames01: any[] = [];
  listGames: any[] = [
    {
      name: 'เกมส์สล็อต/เกมส์ยิงปลา',
      url: 'assets/image/asset/fish.png',
      path: '/games/game001',
    },
    // { name: "เกมส์ยิงปลา", url: "arcade-game.png", path: "/games/game002" },
    {
      name: 'แทงหวย',
      url: 'assets/image/asset/lotto.png',
      path: '/lottery/game-lotto',
    },
    {
      name: 'กีฬา',
      url: 'assets/image/asset/ball.png',
      path: '/games/game004',
    },
    {
      name: 'คาสิโน',
      url: 'assets/image/asset/casino.png',
      path: '/games/game003',
    },
  ];
  list = [];
  arrayOfValues: any[]=[];
  constructor(
    private httpClient: HttpService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const myArray = this.route.snapshot.queryParamMap.get('myArray');
    if (myArray === null) {
      this.arrayOfValues = [];
    } else {
      this.arrayOfValues = JSON.parse(myArray);
    }
  }
  back() {
    this.router.navigate(['/recommend/recommend-user-tab2']);
  }

  goTo(somThing) {}
  // getDashBoard() {
  //   this.httpClient.doGet("web-player/affiliate-player/get-affiliate-play-amount-detail/" + this.username).subscribe(res => {
  //     this.listGames01 = res.data;
  //     for (let index = 0; index < this.listGames01.length; index++) {
  //       if (this.listGames01[index].productTypeNameEn == "LOTTO") {
  //         this.listGames01[index].url = "assets/image/asset/lotto.png"
  //       } else if (this.listGames01[index].productTypeNameEn == "Slot") {
  //         this.listGames01[index].url = "assets/image/asset/fish.png"
  //       }

  //     }

  //     //console.log(" this.listGames01", this.listGames01);

  //   })
  // }
}
