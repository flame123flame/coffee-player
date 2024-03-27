import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountdownConfig } from 'ngx-countdown';
import { HttpService } from 'src/app/service/http.service';
import { GameLotteryComponent } from '../game-lottery.component';
import { debounce } from "lodash";
import { GROUP_STOCKS, HIT, SET } from 'src/app/common/constant/lotto-constant';

const CountdownTimeUnits: Array<[string, number]> = [
  ['Y', 1000 * 60 * 60 * 24 * 365], // years
  ['M', 1000 * 60 * 60 * 24 * 30], // months
  ['D', 1000 * 60 * 60 * 24], // days
  ['H', 1000 * 60 * 60], // hours
  ['m', 1000 * 60], // minutes
  ['s', 1000], // seconds
  ['S', 1], // million seconds
];
@Component({
  selector: 'app-game-lotto003',
  templateUrl: './game-lotto003.component.html',
  styleUrls: ['./game-lotto003.component.css']
})
export class GameLotto003Component implements OnInit {
  inHeader: any
  code: any;
  type: any;
  timeStampServer: any;
  constructor(
    private gameLotto: GameLotteryComponent,
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpService,
  ) {
    this.code = this.route.snapshot.queryParams['code'];
    this.type = this.route.snapshot.queryParams['type'];
    // this.inHeader = this.route.snapshot.queryParams['index'];
    // this.timeStampServer = this.route.snapshot.queryParams['timeStampServer'];
    // this.yeeKee = this.gameLotto.listHeaderYeeKee[this.inHeader];
  }

  time: any;
  date = new Date('2019-01-26T00:00:00');
  list: any[] = []
  listLotto: any[] = [
    { time: "time", tital: "จับยี่กี รอบที่", date: "28/09/2563", timend: "" },
  ]
  yeeKee: any
  ngOnInit(): void {
    this.getLotto()
  }
  back() {
    this.router.navigate(['/lottery/game-lotto']);
  }
  getLotto() {
    this.httpClient.doGetLotto("lotto-list/lotto-category-list-group").subscribe(res => {
      if (this.type == HIT) {
        res.data.lottoHit.forEach(element => {
          if (element.lottoCode == this.code) {
            this.yeeKee = element
          }
        });
      } else if (this.type == SET) {
        res.data.lottoSet.forEach(element => {
          if (element.lottoCode == this.code) {
            this.yeeKee = element
          }
        });
      } else if (this.type == GROUP_STOCKS) {
        res.data.lottoGroupStocks.forEach(element => {
          if (element.lottoCode == this.code) {
            this.yeeKee = element
          }
        });
      }
      this.timeStampServer = res.data.timeStampServer
      this.addCountTime();
    })
  }

  goTo(item) {
    let dateNow = new Date()
    let date = new Date(item.timeClose)
    let time = date.getTime() / 1000 - dateNow.getTime() / 1000
    // if (item.timeCount > 0 && item.timeCountOpen > 0 && time > 0) {
    this.router.navigate(["/lottery/game-lotto/yeekee-play"], {
      queryParams:
        { timeClose: item.timeClose, code: item.count, lottoName: this.yeeKee.lottoName, classCode: this.yeeKee.lottoCode, timeOpen: this.yeeKee.installment.timeOpen }
    }).then(data => {
    })
    // }
  }
  triggerFunction() {
    //console.log('Timer Ended');
  }
  ngOnDestroy(): void {
    this.gameLotto.isSelect = false
  }
  isCloseFn(index) {
    if (null == this.yeeKee.timeSell[index].isClose) {
      this.yeeKee.timeSell[index].isClose = false
    } else {
      this.yeeKee.timeSell[index].isClose = true
      let arrRemove = []
      this.yeeKee.timeSell.forEach((res, index) => {
        if (res.isClose) {
          arrRemove.push(index)
        }
      });
      let arrBackup = []
      arrRemove = arrRemove.slice().reverse()
      arrRemove.forEach(index => {
        arrBackup.push(this.yeeKee.timeSell[index])
        this.yeeKee.timeSell.splice(index, 1)
      })
      arrBackup = arrBackup.slice().reverse()
      this.yeeKee.timeSell = this.yeeKee.timeSell.concat(arrBackup)
    }

  }
  addCountTime() {
    let arrRemove = []
    this.yeeKee.timeSell.forEach((data, index) => {
      data.isHeader = false
      let date = new Date(data.timeClose)
      data.timeCount = date.getTime() / 1000 - this.timeStampServer / 1000
      let dateopen = new Date(data.timeOpen)
      data.timeCountOpen = this.timeStampServer / 1000 - dateopen.getTime() / 1000
      data.isClose = data.timeCount <= 0 ? true : null
      if (data.timeCount <= 0) {
        arrRemove.push(index)
      }
    })
    let arrBackup = []
    arrRemove = arrRemove.slice().reverse()
    arrRemove.forEach(index => {
      arrBackup.push(this.yeeKee.timeSell[index])
      this.yeeKee.timeSell.splice(index, 1)
    })
    arrBackup = arrBackup.slice().reverse()
    this.yeeKee.timeSell = this.yeeKee.timeSell.concat(arrBackup)
  }
  countdownTimeUnits(time): CountdownConfig {
    return {
      leftTime: time,
      formatDate: ({ date, formatStr }) => {
        let duration = Number(date || 0);

        return CountdownTimeUnits.reduce((current, [name, unit]) => {
          if (current.indexOf(name) !== -1) {
            const v = Math.floor(duration / unit);
            duration -= v * unit;
            return current.replace(new RegExp(`${name}+`, 'g'), (match: string) => {
              return v.toString().padStart(match.length, '0');
            });
          }
          //console.log(current);

          return current;
        }, formatStr);
      },
    }
  }
}
