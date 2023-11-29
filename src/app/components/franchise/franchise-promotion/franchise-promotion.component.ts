import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-franchise-promotion',
  templateUrl: './franchise-promotion.component.html',
  styleUrls: ['./franchise-promotion.component.css']
})
export class FranchisePromotionComponent implements OnInit {
  usertype = localStorage.getItem('userType');
  userid = localStorage.getItem('franchiseId');
  referAndEarn = [];
  panelOpenState:false;
  constructor(private router: Router, private userService : UserService) { }

  ngOnInit() {
    this.callApiToReferralEarn();
  }

  callApiToReferralEarn(){
    let data = {
      userid:this.userid,
      userType:this.usertype
    }
    console.log(this.userid, this.usertype)
    this.userService.callApiToReferralAndEarn(data).subscribe({
      next:(res:any)=>{
        console.log(res.data)
        this.referAndEarn = res.data;
      },
      error: error => {
        console.log(error)
      }
    })
  }

  gotohome(){
    this.router.navigate(['/franchisedashboard'])
  }

}
