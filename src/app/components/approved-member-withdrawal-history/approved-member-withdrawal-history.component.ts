import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-approved-member-withdrawal-history",
  templateUrl: "./approved-member-withdrawal-history.component.html",
  styleUrls: ["./approved-member-withdrawal-history.component.css"],
})
export class ApprovedMemberWithdrawalHistoryComponent implements OnInit {
  approvedMemberWithdrawalAmount = [];
  searchText: any;
  p: any;
  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.approvedMemberWithdrawal();
  }

  approvedMemberWithdrawal() {
    this.userService.approvedMemberWithdrawalAmount().subscribe({
      next: (response: any) => {
        if (response) {
          this.approvedMemberWithdrawalAmount = Object.values(response.data);
        }
      },
      error: (error) => {
        this.toastr.error("Something went wrong", "Error");
      },
    });
  }
}
