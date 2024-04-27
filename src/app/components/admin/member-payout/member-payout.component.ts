import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/service/user.service";


@Component({
  selector: 'app-member-payout',
  templateUrl: './member-payout.component.html',
  styleUrls: ['./member-payout.component.css']
})
export class MemberPayoutComponent implements OnInit {
  referral_id:string="";
  newPartnerTeam:[] = [];
  partner:[] = [];
  constructor(private router : Router, private route: ActivatedRoute, private userService : UserService,) { 
    this.route.params.subscribe((params) => {
      this.referral_id = params["id"];
    });
  }

  ngOnInit() {
    this.callApiToMyTeam();
  }

  callApiToMyTeam(){
    let referralID = {
      referralId : this.referral_id
    }
    this.userService.callApiToMyteamForReferral(referralID).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.partner = res.partners
        this.newPartnerTeam = res.multiplePartners;
      },
      error:(error=>{
        console.log(error)
      })
    })
  }

  goBack() {
    this.router.navigate(["/dashboard/member-history"]);
  }

}
