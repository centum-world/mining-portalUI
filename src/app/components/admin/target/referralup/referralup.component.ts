import { Component, OnInit } from '@angular/core';
import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-referralup',
  templateUrl: './referralup.component.html',
  styleUrls: ['./referralup.component.css']
})
export class ReferralupComponent implements OnInit {

  lastThreeMonth = {
    lastmonth : 0,
    secontMonth: 0,
    thirdMonth: 0,
    total:0
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userService : UserService, private toastr : ToastrService) { }

  ngOnInit() {
    this.callApiToUpGradeReferral();
    console.log(this.data)
  }

  callApiToUpGradeReferral(){
    let data = {
      referralId: this.data.reffer_id
    }

    this.userService.fetchMemberLastTrheeMonth(data).subscribe({
      next:(res:any)=>{
        console.log(res.lastThreeMonthsLiquidity)
        this.lastThreeMonth.lastmonth = res.lastThreeMonthsLiquidity.lastMonth;
        this.lastThreeMonth.secontMonth = res.lastThreeMonthsLiquidity.secondLastMonth;
        this.lastThreeMonth.thirdMonth = res.lastThreeMonthsLiquidity.thirdLastMonth;
        this.lastThreeMonth.total = (res.lastThreeMonthsLiquidity.lastMonth + res.lastThreeMonthsLiquidity.secondLastMonth + res.lastThreeMonthsLiquidity.thirdLastMonth);
      },
      error:(error=>{

      })
    })
  }

  upGrade(){
    let data ={
      userId: this.data.m_userid
    }
    this.userService.referralUpGrade(data).subscribe({
      next:(res:any)=>{
        this.toastr.success(res.message)
      },
      error:(error=>{
        this.toastr.error(error.error.message)
      })
    })
  }
}
