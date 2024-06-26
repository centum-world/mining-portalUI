import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { MatDialogConfig } from "@angular/material";
import { UserService } from "src/app/service/user.service";
import { MiningAddBankComponent } from "../dialog/mining-add-bank/mining-add-bank.component";
import { MiningViewBankComponent } from "../dialog/mining-view-bank/mining-view-bank.component";
import { HelpSupportComponent } from "../dialog/help-support/help-support.component";
import { ToastrService } from 'ngx-toastr';
import { MiningEditAndViewBankComponent } from "../dialog/mining-edit-and-view-bank/mining-edit-and-view-bank.component";
import { PartnerAddLiquidityComponent } from "../dialog/partner-add-liquidity/partner-add-liquidity.component";
import { MyPayoutHistoryComponent } from "../dialog/my-payout-history/my-payout-history.component";
import { RigAccountComponent } from "../dialog/rig-account/rig-account.component";

@Component({
  selector: "app-mining-sidebar",
  templateUrl: "./mining-sidebar.component.html",
  styleUrls: ["./mining-sidebar.component.css"],
})
export class MiningSidebarComponent implements OnInit {
  isVisible: boolean = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private userService: UserService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {}

  toggleSidebar() {
    this.isVisible = !this.isVisible;
  }
  closeSidebar() {
    this.isVisible = false;
  }

  partnerViewList() {
    this.router.navigate(["/miningdashboard/partner-details"]);
    this.isVisible = false;
  }
  // partnerWithdraw() {
  //   this.router.navigate(["/miningdashboard/withdraw"]);
  //   this.isVisible = false;
  // }

  gotoDahashboard() {
    this.router.navigate(["/miningdashboard/home"]);
  }

  addBankDetails() {
    this.closeSidebar()
    let config: MatDialogConfig = {
      panelClass: "partnerAddBankDialogClass",
    };
    const dialogRef = this.dialog.open(MiningAddBankComponent, config);

    dialogRef.afterClosed().subscribe((result) => {});
  }

  viewBankDetails() {
    let config: MatDialogConfig = {
      panelClass: "partnerViewBankDetailsDialogClass",
    };
    const dialogRef = this.dialog.open(MiningViewBankComponent, config);

    dialogRef.afterClosed().subscribe((result) => {});
  }

  editAndViewBankDetails() {
    this.closeSidebar()
    let config: MatDialogConfig = {
      panelClass: "partnerEditAndViewBankDetailsDialogClass",
    };
    const dialogRef = this.dialog.open(MiningEditAndViewBankComponent, config);

    dialogRef.afterClosed().subscribe((result) => {});
  }




  myteam() {
    this.isVisible = false;
    this.router.navigate(["/miningdashboard/my-team"]);
  }
  referralPayout(){
    this.isVisible = false;
    this.router.navigate(['/miningdashboard/referral-payout']);
  }
  payoutTransactionHistory(){
    this.isVisible = false;
    this.router.navigate(['/miningdashboard/transaction-history'])
  }

  FranchiseList() {}
  memberViewList() {}
  viewList() {}

  helpAndSupport() {
    this.isVisible = false;
    let config: MatDialogConfig = {
      panelClass: "helpAndSupportDialogClass",
    };
    const dialogRef = this.dialog.open(HelpSupportComponent, config);

    dialogRef.afterClosed().subscribe((result) => {});
  }

  addLiquidity(){
    this.isVisible = false;
    let config: MatDialogConfig = {
      panelClass: "partnerRigDialogClass",
    };
    const dialogRef = this.dialog.open(PartnerAddLiquidityComponent, config);

    dialogRef.afterClosed().subscribe((result) => {});
  }

  downloadBond(){
    let partnerIdDetails = localStorage.getItem("partnerdetails");
    let data = {
      userId: partnerIdDetails,
    };
    this.userService.fetchPartnerBond(data).subscribe({
      next: (res: any) => {
        console.log(res.data[0].bond);
        const bondData = res.data[0].bond;
        const pdfUrl = bondData;

        window.open(pdfUrl, "_blank");
      },
      error: (err) => {
        console.log(err.error.message);
        this.toastr.warning("!No Partnership bond Found")
      },
    });
  }

  myPayoutCount(){
    let config: MatDialogConfig = {
      panelClass: "partnerRigAccountDialogClass",
    };
    const dialogRef = this.dialog.open(MyPayoutHistoryComponent, config);

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }

  downloadInvoiceBond(){
    let config: MatDialogConfig = {
      panelClass: "partnerRigAccountDialogClass",
    };
    const dialogRef = this.dialog.open(RigAccountComponent, config);

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }

  logOut() {
    console.log("logging out");
    localStorage.clear();
    this.router.navigate(["/mininglogin"]);
  }
}
