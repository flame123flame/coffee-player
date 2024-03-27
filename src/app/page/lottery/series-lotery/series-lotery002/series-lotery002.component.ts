import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { listLoto } from 'src/app/common/constant/lotto-constant';
import { HttpService } from 'src/app/service/http.service';
declare var $: any;
@Component({
  selector: 'app-series-lotery002',
  templateUrl: './series-lotery002.component.html',
  styleUrls: ['./series-lotery002.component.css'],
})
export class SeriesLotery002Component implements OnInit {
  setListLoto: any[] = []
  username: string;
  textError:any;
   isPass = true
   isPassError = true
   isPassErrorDetail = true
  textHeader: any;
  listData: any[] = [{ lottoKind: "", lottoNumber: "", digit: -1 }]
  constructor(private httpClient: HttpService, private fb: FormBuilder, private httpSV: HttpService, private router: Router) {
  }

  ngOnInit(): void {
    this.username = localStorage.getItem("username");
    this.masterData();
  }
  masterData() {
    this.httpClient.doGetLotto("msd-lotto-kind/get-all-msd").subscribe(res => {
      this.setListLoto = res.data;
    })
  }
  checkCode(event, idx) {
    for (let index = 0; index < this.setListLoto.length; index++) {
      if (this.setListLoto[index].msdLottoKindCode == event) {
        this.listData[idx].lottoKind = event
        this.listData[idx].lottoNumber = ""
        this.listData[idx].digit = this.setListLoto[index].requireDigit
      }
    }


  }
  updateInput(event, index) {
    if ('NaN' == Number(this.listData[index].lottoNumber).toString()) {
      this.listData[index].lottoNumber = ''
    }
    if (event.toString().length > this.listData[index].digit) {
      let length = this.listData[index].lottoNumber.toString().length
      this.listData[index].lottoNumber = this.listData[index].lottoNumber.toString().substring(0, length - 1)
    }
    if (event < 0) {
      this.listData[index].lottoNumber = ""
    }

  }
  removelistDetailForm(index) {
    this.listData.splice(index, 1)
  }
  addList() {
    this.listData.push({ lottoKind: "", lottoNumber: "", digit: -1 })
  }
  save() {
   
   

    if (null == this.textHeader) {
      // this. addList();
      this.isPass = false
      this.isPassError= false
    }else{
      this.isPassError= true
      this.isPass = true
    }

    this.listData.forEach((res, index) => {
      // if (res[index].lottoKind == null && res[index].lottoNumber) {
      //   this.isPass = false
        
      // }
      if (res.lottoNumber.length != res.digit) {
        this.isPass = false
       
      }

    })

    if (this.isPass) {
      let data = {
        usernameOwner: this.username,
        name: this.textHeader,
        lottoGroupNumberChildList: this.listData
      }
      this.httpSV.doPost('lotto-group-number', data).subscribe(
        (res) => {
          this.router.navigate(['lottery/series-lotery'], {});
        },
        (error) => {
          /**  ยังไปหลังบ้านไม่สำเร็จ */
          console.error(error);
        },
      );
    } else {

    }
  }

}
