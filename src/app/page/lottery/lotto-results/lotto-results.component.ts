import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lotto-results',
  templateUrl: './lotto-results.component.html',
  styleUrls: ['./lotto-results.component.css']
})
export class LottoResultsComponent implements OnInit {
  @Input() wording: string = 'สรุปยอดแทงทั้งหมด';
  tabIdx1 = 0;
  tabIdx2 = 0;
  path001 = "/lottery/results/lotto-results01"
  path002 = "/lottery/results/lotto-results02"
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.gotoResults01();
  }
  setTap() {
    this.tabIdx1 = 0
    this.tabIdx2 = 0
    let set = this.router.url.indexOf(this.path001) >= 0 ? 1 : this.router.url.indexOf(this.path002) >= 0 ? 2 : 1
    switch (set) {
      case 1:
        this.tabIdx1 = 1
        break;
      case 2:
        this.tabIdx2 = 2
        break;
      default:
        break;
    }
  }
  gotoResults01() {
    this.tabIdx1 = 1;
    this.tabIdx2 = 0;
    this.router.navigate([this.path001])
  }
  gotoResults02() {
    this.tabIdx1 = 0;
    this.tabIdx2 = 2;
    this.router.navigate([this.path002])
  }

}
