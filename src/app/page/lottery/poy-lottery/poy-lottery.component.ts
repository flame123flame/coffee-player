import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-poy-lottery',
  templateUrl: './poy-lottery.component.html',
  styleUrls: ['./poy-lottery.component.css']
})
export class PoyLotteryComponent implements OnInit {
  @Input() wording: string = 'สรุปยอดแทงทั้งหมด';
  @Input() isshow: Boolean = true;
  tabIdx1 = 0;
  tabIdx2 = 0;
  tabIdx3 = 0;
  showMainContent: Boolean = true;
  path06 = "/lottery/poy-lotto/poyLottery006"
  path05 = "/lottery/poy-lotto/poyLottery005"
  path01 = "/lottery/poy-lotto/poyLottery001"
  path02 = "/lottery/poy-lotto/poyLottery002"
  path03 = "/lottery/poy-lotto/poyLottery003"
  path04 = "/lottery/poy-lotto/poyLottery004"

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.isshow = true
    if(this.router.url.indexOf("/poyLottery001detail?code")>=0){
    }else{
      this.gotoTotalLoto();
    }
    this.setTap()
  }
  setTap() {
    this.tabIdx1 = 0;
    this.tabIdx2 = 0;
    this.tabIdx3 = 0;
    let set: Number
    set = this.router.url.indexOf(this.path05) >= 0 ? 1 :
      this.router.url.indexOf(this.path02) >= 0 ? 3 : this.router.url.indexOf(this.path03) >= 0 ? 3 : this.router.url.indexOf(this.path06) >= 0 ? 3 :
        this.router.url.indexOf(this.path04) >= 0 ? 3 : this.router.url.indexOf(this.path01) >= 0 ? 2 : 1

    switch (set) {
      case 1:
        this.tabIdx1 = 1
        break;
      case 2:
        this.tabIdx2 = 2
        break;
      case 3:
        this.tabIdx3 = 3
        break;
      default:
        break;
    }
  }
  gotoTotalLoto() {
    this.tabIdx1 = 1;
    this.tabIdx2 = 0;
    this.tabIdx3 = 0;
    this.router.navigate([this.path05])
  }


  gotoLoto() {
    this.router.navigate(["/lottery/series-lotery"])
  }
  gotoTotalLoto01() {
    this.tabIdx1 = 0;
    this.tabIdx2 = 2;
    this.tabIdx3 = 0;
    this.router.navigate([this.path01])
  }
  gotoTotalLoto02() {
    this.tabIdx1 = 0;
    this.tabIdx2 = 0;
    this.tabIdx3 = 3;
    this.router.navigate([this.path02], { queryParams:
       { code: "GOVERNMENT",
       lottoName:"หวยรัฐบาล"} 
      })
  }
  gotoTotalLoto03() {
    this.tabIdx1 = 0;
    this.tabIdx2 = 0;
    this.tabIdx3 = 3;
    this.router.navigate([this.path03], { queryParams: { code: "STOCKS",
    lottoName:"หวยหุ้น" } })
  }
  gotoTotalLoto04() {
    this.tabIdx1 = 0;
    this.tabIdx2 = 0;
    this.tabIdx3 = 3;
    this.router.navigate([this.path04], { queryParams: { code: "YEEKEE",lottoName:"หวยยี่กี" } })
  }
  gotoTotalLoto06() {
    this.tabIdx1 = 0;
    this.tabIdx2 = 0;
    this.tabIdx3 = 3;
    this.router.navigate([this.path06], { queryParams: { code: "ALL_CLASS_CODE",lottoName:"รายการหวยทั้งหมด" } })
  }

 

}
