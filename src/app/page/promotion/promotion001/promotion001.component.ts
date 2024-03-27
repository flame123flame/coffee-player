import { Component, OnInit, Directive, ElementRef } from '@angular/core';
import { HttpService } from 'src/app/service/http.service';
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { LayoutComponent } from 'src/app/common/layout/layout.component';

@Component({
  selector: 'app-promotion001',
  templateUrl: './promotion001.component.html',
  styleUrls: ['./promotion001.component.css'],
})
export class Promotion001Component implements OnInit {
  isSelect: Boolean = false;
  url_img: string = './assets/image/';
  // listGames: any[] = [
  //   { name: "โบนัสแรกเข้าคาสิโนสด 100%", url: "baner004.jpg" },
  //   { name: "โบนัสแรกเข้ากีฬา 100%", url: "baner003.jpg" },
  //   { name: "โบนัสแรกเข้าสล็อต 100%", url: "baner002.jpg" },
  //   { name: "โบนัสแรกเข้ายิงปลา 100%", url: "baner001.jpg" },
  // ]
  listGamesFromAPI: any[] = [];
  username: any;
  money: any = '0.00';
  selectData: any;
  top: any
  code: any
  Posting = "Posting"
  constructor(
    { nativeElement }: ElementRef<HTMLImageElement>,
    private httpClient: HttpService,
    private router: Router,
    private route: ActivatedRoute,
    private layout: LayoutComponent
  ) {
    this.code = this.route.snapshot.queryParams['code'];
    this.isSelect = this.code ? true : false
    this.layout.isMoney = false;
    const supports = 'loading' in HTMLImageElement.prototype;
    if (supports) {
      nativeElement.setAttribute('loading', 'lazy');
    }
  }
  ngOnDestroy() {
    if (this.isSelect) {
      // this.router.navigate(['/promotion']);


    } else {
      this.layout.isMoney = true;
    }
  }
  ngOnInit(): void {
    console.log(this.router.url);
    this.username = localStorage.getItem('username');
    this.getListPromotion();
  }
  getListPromotion() {
    this.httpClient
      .doGet('web-player/promotion/get-promotion-player')
      .subscribe((res) => {
        if (this.isSelect) { 
          for(let index =0 ; index < res.data.length; index++){
            if(res.data[index].promoCode == this.code ){
              this.selectData = res.data[index]
              break;
            }
          }
        } else {
          this.listGamesFromAPI = res.data;
          this.isSelect = false;
          this.layout.isMoney = true;
        }

      });
  }
  routSandCode(data) {
    let doc = document.documentElement;
    this.top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    window.scrollTo(0, 0)
    this.isSelect = true;
    this.selectData = data;
    this.layout.isMoney = false;
    this.router.navigate(['/promotion/detail'], { queryParams: { code: data.promoCode } });
    // this.selectData.promoDetail = this.selectData.promoDetail.toString().split("<img ").join(`<img style="width:100%;" `)
    // let arr =  document.getElementsByTagName('img')
    // for(let index = 0 ;index <arr.length;index++){
    //   arr[index].style.width = '100%'
    // }
    // this.router.navigate(['/promotion/detail']);
  }

  sandPromotion() {
    this.httpClient
      .doPost('web-player/promotion-request/recive-promotion', {
        username: this.username,
        promoCode: this.selectData.promoCode,
      })
      .subscribe((res) => {
        this.getListPromotion();
      });
  }
}