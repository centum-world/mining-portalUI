import { Component, OnInit, Inject } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { MAT_DIALOG_DATA } from "@angular/material";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: "app-partner-payout-details",
  templateUrl: "./partner-payout-details.component.html",
  styleUrls: ["./partner-payout-details.component.css"],
})
export class PartnerPayoutDetailsComponent implements OnInit {
  partnerDetails = {
    lastPaymentDate: "",
    userid: "",
  };


  constructor(
    private userService: UserService,private toastr:ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data,23);
    this.partnerDetails.userid = data.userid;
  }

  ngOnInit() {
    this.lastApproveDate();
  }

  lastApproveDate() {
    let approveArray = [];
    let data = {
      p_userid: this.partnerDetails.userid,
    };
    this.userService.partnerLastApproveDate(data).subscribe({
      next: (result: any) => {
        console.log(result.data);
        approveArray = Object.values(result.data);
        let lastPaymentOfIndex = approveArray.length;
        this.partnerDetails.lastPaymentDate =
          approveArray[lastPaymentOfIndex - 1].approve_date;
        console.log(this.partnerDetails.lastPaymentDate);
      },
      error: (error) => {
        console.log(error.error.message);
      },
    });
  }


}
