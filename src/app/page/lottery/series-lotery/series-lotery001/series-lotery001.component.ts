import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-series-lotery001',
  templateUrl: './series-lotery001.component.html',
  styleUrls: ['./series-lotery001.component.css']
})
export class SeriesLotery001Component implements OnInit {
  id: any;
  listMaster: any[] = [];
  listGroup: any[] = []
  constructor(private router: Router,  private httpClient: HttpService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.id = this.route.snapshot.queryParams['id'];
    this.masterData();
    if (this.id != null) {
      this.getGroupDetail(this.id);

    } 
  }
  back() {
    this.router.navigate(['/lottery/series-lotery']);
  }
  masterData() {
    this.httpClient.doGetLotto("msd-lotto-kind/get-all-msd").subscribe(res => {
      this.listMaster = res.data;
   
    })
  }
  getGroupDetail(id) {
    this.httpClient.doGet("lotto-group-number/get-by-id/" + id).subscribe(res => {
      this.listGroup = res.data.lottoGroupNumberChildList;
      for (let index = 0; index < this.listGroup.length; index++) {
        for(let index2 = 0; index2 < this.listMaster.length; index2++){
              if(this.listMaster[index2].msdLottoKindCode == this.listGroup[index].lottoKind){
                this.listGroup[index].lottoKind = this.listMaster[index2].msdLottoKindName;
              }
            }
      }
    })
  }

 

}
