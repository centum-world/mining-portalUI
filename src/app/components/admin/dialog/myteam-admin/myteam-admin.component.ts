import { Component, OnInit } from "@angular/core";
import { Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "app-myteam-admin",
  templateUrl: "./myteam-admin.component.html",
  styleUrls: ["./myteam-admin.component.css"],
})
export class MyteamAdminComponent implements OnInit {
  partner:[] =[];
  newPartnerTeam:[]=[];
  referral:string="";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService) {
    // console.log(data.reffer_id)
    this.referral = data.reffer_id
  }

  ngOnInit() {
    this.callApiToMyTeam();
  }

  callApiToMyTeam(){
    let referralID = {
      referralId : this.referral
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
}
