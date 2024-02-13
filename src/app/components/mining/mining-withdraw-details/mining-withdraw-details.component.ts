import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "app-mining-withdraw-details",
  templateUrl: "./mining-withdraw-details.component.html",
  styleUrls: ["./mining-withdraw-details.component.css"],
})
export class MiningWithdrawDetailsComponent implements OnInit {
  partnerRequestHistory = [];
  approvedRequest = [];
  bankDetails = [];
  partnerId = localStorage.getItem("partnerdetails");
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.tabChanged(0);
  }

  gotoDahashboard() {
    this.router.navigate(["/miningdashboard"]);
  }

  tabChanged(event: any) {
    if (event === 0) {
      let data = {
        p_userid: localStorage.getItem("partnerdetails"),
      };
      this.userService.perticularPartnerWithdrawalRequest(data).subscribe({
        next: (res: any) => {
          this.partnerRequestHistory = res.data;
        },
        error: (error) => {
          console.log(error.error.message);
        },
      });
    } else if (event === 1) {
      let data = {
        p_userid: localStorage.getItem("partnerdetails"),
      };
      this.userService.perticularPartnerWithdrawalHistory(data).subscribe({
        next: (res: any) => {
          this.approvedRequest = res.data;
        },
        error: (error) => {
          console.log(error.error.message);
        },
      });
    } else {
      let data = {
        user_id: localStorage.getItem("partnerdetails"),
      };
      this.userService.fetchMiningPartnerBankDetails(data).subscribe({
        next: (res: any) => {
          this.bankDetails = res.data;
        },
        error: (error) => {
          console.log(error.error.message);
        },
      });
    }
  }
}
