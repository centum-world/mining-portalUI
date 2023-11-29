import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-franchise-referral',
  templateUrl: './franchise-referral.component.html',
  styleUrls: ['./franchise-referral.component.css']
})
export class FranchiseReferralComponent implements OnInit {
  myReferralPayout = [];
  constructor(private router : Router, private userService :UserService) { }

  ngOnInit() {
    this.fetchReferralPayout();
  }

  fetchReferralPayout(){
    let data = {
      userid : localStorage.getItem('franchiseId'),
      userType : localStorage.getItem('userType')
    }

    this.userService.memberReferralPayoutHistory(data).subscribe({
      next:(res:any)=>{
        console.log(res.data)
        this.myReferralPayout = res.data;
      },
      error: (error) => {
        console.log(error.error.message)
      }
    })
  }

  goBack(){
    this.router.navigate(['/franchisedashboard/home'])
  }

}
