import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-bmm-promotion',
  templateUrl: './bmm-promotion.component.html',
  styleUrls: ['./bmm-promotion.component.css']
})
export class BmmPromotionComponent implements OnInit {
  usertype = localStorage.getItem('userType');
  userid = localStorage.getItem('stateHandlerId');
  referEarn = [];
  panelOpenState:false;
  constructor(private router : Router, private userService : UserService) { }

  ngOnInit() {
    this.callApiToReferralEarn();
  }

  callApiToReferralEarn(){
    let data = {
      userid:this.userid,
      userType:this.usertype
    }
    this.userService.callApiToReferralAndEarn(data).subscribe({
      next:(res:any)=>{
        console.log(res.data)
        this.referEarn = res.data

      },
      error: error => {
        console.log(error)
      }
    })
  }


  gotohome(){
    this.router.navigate(['/statedashboard']);
  }
}
