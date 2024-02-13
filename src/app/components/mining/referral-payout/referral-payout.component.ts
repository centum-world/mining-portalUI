import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-referral-payout",
  templateUrl: "./referral-payout.component.html",
  styleUrls: ["./referral-payout.component.css"],
})
export class ReferralPayoutComponent implements OnInit {
  referralRequestHistory = [];
  apprvedHistory = [];
  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.referralTabChange(0);
  }
  referralTabChange(event: any) {
    if (event === 0) {
      let data = {
        userId: localStorage.getItem("partnerdetails"),
      };
      if (event === 0) {
        this.userService.partnerReferalRequst(data).subscribe({
          next: (res: any) => {
            this.referralRequestHistory = res.result;
          },
          error: (err) => {
            console.log(err.error.message);
          },
        });
      }
    } else {
      let data = {
        userId: localStorage.getItem("partnerdetails"),
      };
      this.userService.fetchPartnerReferralPayout(data).subscribe({
        next: (res: any) => {
          this.apprvedHistory = res.result;
        },
        error: (err) => {
          console.log(err.error.message);
        },
      });
    }
  }

  goBack() {
    this.router.navigate(["/miningdashboard/my-team"]);
  }
}
