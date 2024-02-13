import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-mining-view-bank",
  templateUrl: "./mining-view-bank.component.html",
  styleUrls: ["./mining-view-bank.component.css"],
})
export class MiningViewBankComponent implements OnInit {
  selectedBank = {
    bankName: null,
  };
  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}
  bankDetails = [];
  ngOnInit() {
    this.fetchBankDetails();
  }

  fetchBankDetails() {
    let data = {
      user_id: localStorage.getItem("partnerdetails"),
    };
    this.userService.fetchMiningPartnerBankDetails(data).subscribe({
      next: (res: any) => {
        this.bankDetails = res.data;
        console.log(res.data);
        for (const entry of res.data) {
          if (entry.isPrimary === 1) {
            this.selectedBank.bankName = entry.bank_name;
          }
        }
      },
      error: (error) => {
        console.log(error.error.message);
      },
    });
  }

  onRadioChange() {
    console.log(this.selectedBank.bankName);
    let data = {
      user_id: localStorage.getItem("partnerdetails"),
      bank_name: this.selectedBank.bankName,
    };

    this.userService.shoChangePrimarybank(data).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message);
      },
      error: (err) => {
        this.toastr.warning(err.error.message);
      },
    });
  }
}
