import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-member-referrral-payout',
  templateUrl: './member-referrral-payout.component.html',
  styleUrls: ['./member-referrral-payout.component.css']
})
export class MemberReferrralPayoutComponent implements OnInit {

  requestHistroy =[];
  constructor(private userService : UserService, private router: Router) { }

  ngOnInit() {
    this.myReferralPayout()
  }

  myReferralPayout(){
    let data = {
      userid : localStorage.getItem('userdetail'),
      userType : localStorage.getItem('userType')
    }

    this.userService.memberReferralPayoutHistory(data).subscribe({
      next:(res:any)=>{
        console.log(res.data)
        this.requestHistroy = res.data
      },
      error: (error) => {
        console.log(error.error.message)
      }
    })

  }

  gotoDashboard(){
    this.router.navigate(['/memberdashboard/home'])
  }

}
