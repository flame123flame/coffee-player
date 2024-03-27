import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutComponent } from 'src/app/common/layout/layout.component';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-user003-detail',
  templateUrl: './user003-detail.component.html',
  styleUrls: ['./user003-detail.component.css']
})
export class User003DetailComponent implements OnInit {
  promoTitle: any
  createdDate: any
  webMessage: any
  subject: any

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpService,
    private layout: LayoutComponent,) {
    this.layout.isMoney = false
    this.router.events.subscribe(event => {
      this.getValue()
    });
  }
  ngOnDestroy() {
    this.layout.isMoney = true
  }
  ngOnInit(): void {
    this.getValue()
  }


  getValue() {
    this.subject = this.route.snapshot.queryParams['subject'] || ""
    this.promoTitle = this.route.snapshot.queryParams['promoTitle'] || ""
    this.createdDate = this.route.snapshot.queryParams['createdDate'] || ""
    this.webMessage = localStorage.getItem('message')
  }

}
