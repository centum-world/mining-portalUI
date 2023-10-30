import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-mining-account',
  templateUrl: './mining-account.component.html',
  styleUrls: ['./mining-account.component.css']
})
export class MiningAccountComponent implements OnInit {

  constructor(private router:Router,private dialog: MatDialog,private userService:UserService) { }
  partnerDetails = {
    partnerID:'',
    dop:'',
    liquidity:'',
    monthComplete:0,
    lastPaymentDate:'',
    status:Boolean
  }

  ngOnInit() {
    this.fetchMiningPartnerProfileDetails();
    this.lastApproveDate();
  }

  
  fetchMiningPartnerProfileDetails(){
    let partnerIdDetails = localStorage.getItem('partnerdetails');
    let data = {
      p_userid: partnerIdDetails
    }
    this.userService.fetchMiningPartnerProfileDetails(data).subscribe({
      next:(res:any)=>{
        console.log(res.data[0])
        this.partnerDetails.partnerID = res.data[0].p_userid
        this.partnerDetails.dop = res.data[0].p_dop;
        this.partnerDetails.liquidity = res.data[0].p_liquidity;
        this.partnerDetails.monthComplete = res.data[0].partner_count;
      },
      error:(err=>{
        console.log(err.error.message)
      })
    })
  }

  lastApproveDate() {
    let approveArray = [];
    let data = {
      p_userid: localStorage.getItem('partnerdetails')
    }
    this.userService.partnerLastApproveDate(data).subscribe({
      next: (result: any) => {
        approveArray = Object.values(result.data);
        let lastPaymentOfIndex = approveArray.length;
        this.partnerDetails.lastPaymentDate = approveArray[lastPaymentOfIndex - 1].approve_date;
        console.log(this.partnerDetails.lastPaymentDate);
      }
    })
  }
  gotoHome(){
    this.router.navigate(['/miningdashboard/home'])
  }
}