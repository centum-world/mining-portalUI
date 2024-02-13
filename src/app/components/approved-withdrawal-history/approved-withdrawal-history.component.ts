import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-approved-withdrawal-history",
  templateUrl: "./approved-withdrawal-history.component.html",
  styleUrls: ["./approved-withdrawal-history.component.css"],
})
export class ApprovedWithdrawalHistoryComponent implements OnInit {
  finalWithdrawalList: any;
  searchText: any;
  p: any;
  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.withdrawalAmountHistory();
  }

  withdrawalAmountHistory() {
    this.userService.finalApprovedWithdrawalList().subscribe({
      next: (response: any) => {
        if (response) {
          this.finalWithdrawalList = Object.values(response.data);
        }
      },
      error: (error) => {
        this.toastr.error("Something went wrong", "Error");
      },
    });
  }
}
