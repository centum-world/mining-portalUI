import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-member-view-bank",
  templateUrl: "./member-view-bank.component.html",
  styleUrls: ["./member-view-bank.component.css"],
})
export class MemberViewBankComponent implements OnInit {
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
      user_id: localStorage.getItem("userdetail"),
    };
    this.userService.fetchMemberBankDetails(data).subscribe({
      next: (res: any) => {
        this.bankDetails = res.data;
      },
      error: (error) => {
        console.log(error.error.message);
      },
    });
  }

  onRadioChange() {
    let data = {
      user_id: localStorage.getItem("userdetail"),
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
