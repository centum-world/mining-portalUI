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
  requestHistory: any[] = [];
  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.myReferralPayout();
  }
  myReferralPayout() {
    let data = {
      partnerId: localStorage.getItem("partnerdetails"),
    };

    this.userService.callApiToFetchReferralPayoutForPartner(data).subscribe({
      next: (res: any) => {
        console.log(res)
        if (res && res.data && Array.isArray(res.data)) {
          this.requestHistory = res.data;
        } else {
          console.error("Invalid data format received from server");
        }
      },
      error: (error) => {
        console.log(error.error.message);
      },
    });
  }
  gotoDashboard(){
    this.router.navigate[('/miningdashboard/home')]
  }
  
}
