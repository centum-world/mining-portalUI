import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { UserService } from "src/app/service/user.service";
import { WithdrawDialogComponent } from "../../sho/diolog/withdraw-dialog/withdraw-dialog.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-withdrawl-franchise",
  templateUrl: "./withdrawl-franchise.component.html",
  styleUrls: ["./withdrawl-franchise.component.css"],
})
export class WithdrawlFranchiseComponent implements OnInit {
  requestHistroy = [];
  approvedHistory = [];
  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.tabChanged(0);
  }

  withdrawDialog() {
    let config: MatDialogConfig = {
      panelClass: "myFranchiseWithdrawDialogClass",
    };
    const dialogRef = this.dialog.open(WithdrawDialogComponent, config);
  }

  tabChanged(tab: any) {
    if (tab === 0) {
      let data = {
        userId: localStorage.getItem("franchiseId"),
      };
      this.userService.paymentRequestForSho(data).subscribe({
        next: (res: any) => {
          this.requestHistroy = res.paymentRequests;
        },
        error: (error) => {
          console.log(error.error.message);
        },
      });
    } else if (tab === 1) {
      let data = {
        userId: localStorage.getItem("franchiseId"),
      };
      this.userService.fetchPaymentApprovedForAll(data).subscribe({
        next: (res: any) => {
          this.approvedHistory = res.paymentApprovals;
        },
        error: (error) => {
          console.log(error.error.message);
        },
      });
    }
  }

  goBack() {
    this.router.navigate(["/franchisedashboard"]);
  }
}
