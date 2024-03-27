import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import * as moment from 'moment'
import { LayoutComponent } from 'src/app/common/layout/layout.component';
import { CountdownConfig } from 'ngx-countdown';
import { government, stocks, yeekee, HIT, SET, GROUP_STOCKS, GOVERNMENT, STOCKS, YEEKEE } from 'src/app/common/constant/lotto-constant';
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
  selector: 'app-game-lottery',
  templateUrl: './game-lottery.component.html',
  styleUrls: ['./game-lottery.component.css']
})

export class GameLotteryComponent implements OnInit {
  typeLotto = [
    { code: government, path: "/lottery/game-lotto/game001", text: "แทงหวย" },
    { code: stocks, path: "/lottery/game-lotto/game001", text: "แทง Stock" },
    { code: yeekee, path: "/lottery/game-lotto/game003", text: "จับยี่กี" },
  ]
  typeHeaderLotto = [
    { code: HIT, text: "หวยยอดนิยม", isHasData: false },
    { code: SET, text: "หวยชุด", isHasData: false },
    { code: GROUP_STOCKS, text: "หวยหุ้น", isHasData: false }
  ]
  listHeader: any[] = []
  isSelect: Boolean = false
  indexHeader: any
  indexSub: any
  timeStampServer: any
  moreThan24Hours: CountdownConfig = {
    leftTime: 60 * 60 * 24,
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
        return current;
      }, formatStr);
    },
  };

  constructor(
    private router: Router,
    private httpClient: HttpService,
    private layout: LayoutComponent,
  ) {

  }

  ngOnInit(): void {
    this.isSelect = false
    this.checkIsSelectFn()
    this.getLotto()
    this.layout.getMoneyLotto()
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.layout.getMoney()
  }
  checkIsSelectFn() {
      if (this.router.url.indexOf('/lottery/game-lotto/lotto-game') >= 0||this.router.url.indexOf('/lottery/game-lotto/yeekee') >= 0) {
        this.isSelect = true
      }
    //console.log(this.isSelect);
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
          return current;
        }, formatStr);
      },
    }
  }
  getLotto() {
    // this.httpClient.doGetLotto("lotto-list/lotto-category-list-group").subscribe(res => {})
    this.httpClient.doGetLotto("lotto-list/lotto-category-list-group").subscribe(res => {
      this.timeStampServer = res.data.timeStampServer
      res.data.lottoHit.forEach(data => {
        data.type = HIT
        this.typeHeaderLotto.forEach(res => {
          if (res.code == HIT) {
            res.isHasData = true
          }
        })
      })
      res.data.lottoSet.forEach(data => {
        data.type = SET
        this.typeHeaderLotto.forEach(res => {
          if (res.code == SET) {
            res.isHasData = true
          }
        })
      })
      res.data.lottoGroupStocks.forEach(data => {
        data.type = GROUP_STOCKS
        this.typeHeaderLotto.forEach(res => {
          if (res.code == GROUP_STOCKS) {
            res.isHasData = true
          }
        })
      })
      // แทงหวย 
      this.listHeader = []
      this.listHeader = this.listHeader.concat(res.data.lottoHit)
      this.listHeader = this.listHeader.concat(res.data.lottoSet)
      this.listHeader = this.listHeader.concat(res.data.lottoGroupStocks)
      this.listHeader.forEach(data => {

      })
      this.addCountTime()
    })
  }
  addCountTime() {
    let dateNow = new Date()
    this.listHeader.forEach((data, index) => {
      data.isHeader = false
      if (index == 0) {
        this.listHeader[index].isHeader = true
      } else if (this.listHeader[index - 1].type != this.listHeader[index].type) {
        data.isHeader = true
      }
      let date = new Date(data.installment.timeClose)
      data.timeCount = date.getTime() / 1000 - dateNow.getTime() / 1000

      let dateopen = new Date(data.installment.timeOpen)
      data.timeCountOpen = dateNow.getTime() / 1000 - dateopen.getTime() / 1000
    })
  }
  goTo(item, header, sub) {
    if (item.status == 'SHOW' && item.timeCount > 0 && item.timeCountOpen > 0) {
      this.indexHeader = header
      this.indexSub = sub
      if (item.categoryCode == GOVERNMENT) {
        this.router.navigate(["/lottery/game-lotto/lotto-game"], { queryParams: { code: item.lottoCode, type: item.type } }).then(data => {
          this.isSelect = true
        })
      } else if (item.categoryCode == STOCKS) {
        this.router.navigate(["/lottery/game-lotto/lotto-game"], { queryParams: { code: item.lottoCode, type: item.type } }).then(data => {
          this.isSelect = true
        })
      } else if (item.categoryCode == YEEKEE) {
        this.router.navigate(["/lottery/game-lotto/yeekee"], { queryParams: { code: item.lottoCode,type:item.type, timeStampServer: this.timeStampServer } }).then(data => {
          this.isSelect = true
        })
      }
    }

  }
}
