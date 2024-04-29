import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-referral-transaction',
  templateUrl: './referral-transaction.component.html',
  styleUrls: ['./referral-transaction.component.css']
})
export class ReferralTransactionComponent implements OnInit {
  rigId:string='';
  referral_Id:string="";
  referralTransactionData:[] = [];
  constructor(  private route: ActivatedRoute, private router : Router, private userService : UserService) { 
    this.route.params.subscribe((params) => {
      this.rigId = params["rigId"];
      this.referral_Id = params["id"]
    });
  }

  ngOnInit() {
    console.log(this.referral_Id, this.rigId);
    this.callApiToFetchTransactionOfReferral();

  }
  callApiToFetchTransactionOfReferral(){
    let data = {
      rigId : this.rigId
    }

    this.userService.callApiToFetchReferralTransaction(data).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.referralTransactionData = res.data;
      },
      error:(error=>{
        console.log(error)
      })
    })

  }

  goBack(){
    this.router.navigate(["/dashboard/my-partner",this.referral_Id]);
  }

}
