import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-rig-account",
  templateUrl: "./rig-account.component.html",
  styleUrls: ["./rig-account.component.css"],
})
export class RigAccountComponent implements OnInit {
  data: any[] = [];
  constructor(private userService: UserService, private router : Router) {}

  ngOnInit() {
    this.callApiToMultipleAccount();
  }

  callApiToMultipleAccount() {
    let data = {
      userId: localStorage.getItem("partnerdetails"),
    };
    this.userService.callApiToMultipleRig(data).subscribe({
      next: (response: any) => {
        console.log(response.data);
        const newData = {
          fname: response.data[0].p_name,
          lname: response.data[0].p_lname,
          liquidity: response.data[0].p_liquidity,
          rigId: response.data[0].rigId,
          partner_status : response.data[0].partner_status,
        };
        response.data.unshift(newData);
        response.data.splice(1, 1);
        this.data = response.data;
      },
      error: (error) => {},
    });
  }

  gotoPartnerPayout(data:any){
    console.log(data.rigId)
    this.router.navigate([
      "miningdashboard/rig-payout",
      data.rigId
    ]);
  }
}
