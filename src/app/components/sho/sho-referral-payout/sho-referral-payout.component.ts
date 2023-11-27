import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-sho-referral-payout',
  templateUrl: './sho-referral-payout.component.html',
  styleUrls: ['./sho-referral-payout.component.css']
})

export class ShoReferralPayoutComponent implements OnInit {

   shoID: string;
  bmmReferralPayout = [];
  myWallet = 0;
  
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router : Router
  ) {
    this.shoID = localStorage.getItem('stateHandlerId')
  }

  ngOnInit() {
    // console.log(this.shoID)
    // this.tabChanged(0);
     this.callApiToShoDetails();
    this.callApiToReferralPayout();
  }

  callApiToReferralPayout(){
    let data = {
      userid: this.shoID
    }
    this.userService.memberReferralPayoutHistory(data).subscribe({
      next: (res: any) => {
        console.log(res)
        this.bmmReferralPayout = res.data;
      },
      error: (error) => {
        console.log(error.error.message)
      }
    })
  }
    
  callApiToShoDetails(){
    let data ={
      stateHandlerId : this.shoID
    }
    this.userService.shoDetails(data).subscribe({
      next:(res:any)=>{
        console.log(res.sho.stateHandlerWallet)
        this.myWallet = res.sho.stateHandlerWallet;
      },
      error:(err=>{
        console.log(err.error.message)
      })
    })
  }

  goBack(){
    this.router.navigate(['/statedashboard/home'])
  }

}
