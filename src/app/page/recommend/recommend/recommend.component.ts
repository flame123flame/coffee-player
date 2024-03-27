import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recommend002detailComponent } from '../recommend002detail/recommend002detail.component';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css']
})
export class RecommendComponent implements OnInit {
  @Input() isShow: string = 'show';

  showMainContent: Boolean = true;
  @Input() tabIdx: number = 1;
  check: any;


  listMenu: any[] = [
    {
      name: "จำนวนคลิกทั้งหมด",
      event: "3"
    },
    {
      name: "สมาชิกที่แนะนำได้",
      event: "6"
    },
    {
      name: "รายได้ทั้งหมด",
      event: "109.00"
    },
    {
      name: "รายได้ปัจจุบัน",
      event: "85.00"
    }

  ]
  href: string;
  constructor(private router: Router) {


  }

  ngOnInit(): void {

    // //console.log( this.router.url);

    this.clickTap(3);
  }

  clickTap(idx) {
    this.isShow = 'show'
    if (idx == 1) {
      this.router.navigate(["/recommend/recommend-user-tab1"])

    } else if (idx == 2) {
      this.router.navigate(["/recommend/recommend-user-tab2"])
    } else if (idx == 3) {
      this.router.navigate(["/recommend/recommend-user-tab3"])
    } else if (idx == 4) {
      this.router.navigate(["/recommend/recommend-user-tab4"])

      // this.router.navigate(['/']);  
    }
    if (this.router.url == '/recommend/recommend-user-tab2-detail') {
      this.isShow = 'hide'
    }
    this.tabIdx = idx
    // this.href = this.router.url;
    //console.log(this.router.url);

    this.check = this.router.url



  }

}
