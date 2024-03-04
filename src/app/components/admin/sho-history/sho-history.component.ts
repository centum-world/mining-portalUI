import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material/dialog";
import { MatDialogConfig } from "@angular/material/dialog";
import { BlockShoComponent } from "../dialog/block-sho/block-sho.component";
import { VerifyShoComponent } from "../dialog/verify-sho/verify-sho.component";
import { ShoViewComponent } from "../dialog/sho-view/sho-view.component";
import { EditShoComponent } from "../dialog/edit-sho/edit-sho.component";
import { Router } from "@angular/router";

interface Sho {
  stateHandlerId: "";
  fname: string;
  lname: string;
  phone: string;
  email: string;
  gender: string;
  referralId: string;
  selectedState: string;
  actions: string;
  userType: string;
}
@Component({
  selector: "app-sho-history",
  templateUrl: "./sho-history.component.html",
  styleUrls: ["./sho-history.component.css"],
})
export class ShoHistoryComponent implements OnInit {
  @ViewChild('paginatorVerified', { static: true }) paginatorVerified: MatPaginator;
  @ViewChild('paginatorUnverified', { static: true }) paginatorUnverified: MatPaginator;
  @ViewChild('paginatorUpgradeDowngrade', { static: true }) paginatorUpgradeDowngrade: MatPaginator;
  displayedColumns: string[] = [
    "stateHandlerId",
    "fname",
    "lname",
    "email",
    "phone",
    "gender",
    "referralId",
    "selectedState",
    "actions",
  ];

  displayedColumns1: string[] = [
    "stateHandlerId",
    "fname",
    "lname",
    "email",
    "phone",
    "gender",
    "referralId",
    "selectedState",
    "actions",
  ];

  downgradeColumns: string[] = [
    "stateHandlerId",
    "fname",
    "lname",
    "email",
    "phone",
    "gender",
    "referralId",
    "selectedState",
    "userType",
  ];

  dataSourceVerified: MatTableDataSource<Sho>;
  dataSourceUnverified: MatTableDataSource<Sho>;
  dataSourceUpgradeDowngrade: MatTableDataSource<Sho>;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.dataSourceVerified = new MatTableDataSource([]);
    this.dataSourceUnverified = new MatTableDataSource([]);
    this.dataSourceUpgradeDowngrade = new MatTableDataSource([]); 
  }

  ngOnInit() {
    this.dataSourceVerified.paginator = this.paginatorVerified;
    this.dataSourceUnverified.paginator = this.paginatorUnverified;
    this.dataSourceUpgradeDowngrade.paginator = this.paginatorUpgradeDowngrade;

    this.tabChanged(0);
    this.callApiToFetchAllSho();
    
  }

  tabChanged(event: any) {
    if (event === 0) {
      this.userService.CallApifetchVerifiedBmm().subscribe({
        next: (res: any) => {
          this.dataSourceVerified.data = res.data;
        },
        error: (err) => {
          console.log(err.error.message);
        },
      });
    } else if (event === 1) {
      this.userService.CallApifetchUnVerifiedBmm().subscribe({
        next: (res: any) => {
          console.log(res.data)
          this.dataSourceUnverified.data = res.data;
          this.dataSourceUnverified.paginator.pageSize = this.dataSourceUnverified.data.length;
          this.dataSourceUnverified.paginator.firstPage();
        },
        error: (err) => {
          console.log(err.error.message);
        },
      });
    } else if (event === 2) {
      this.userService.CallApifetchUpgradeDowngradeBmm().subscribe({
        next: (res: any) => {
          this.dataSourceUpgradeDowngrade.data = res.data;
        },
        error: (err) => {
          console.log(err.error.message);
        },
      });
    }
  }
  callApiToFetchAllSho() {
    this.userService.CallApifetchVerifiedBmm().subscribe({
      next: (res: any) => {
        console.log(res.data)
        this.dataSourceVerified.data = res.data;
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }

  applyFilter(filterValue: string) {
    this.dataSourceVerified.filter = filterValue.trim().toLowerCase();
  }

  openIsBlockDialog(shoData: any) {
    console.log(shoData);

    let config: MatDialogConfig = {
      panelClass: "myBusinessMarketingBlockDialogClass",
      data: shoData,
    };
    const dialogRef = this.dialog.open(BlockShoComponent, config);
    dialogRef.componentInstance.okClicked.subscribe(() => {
      console.log("clicked");
      let data = {
        isBlocked: !shoData.isBlocked,
        stateHandlerId: shoData.stateHandlerId,
      };
      this.userService.callApiToBlockOrUnblockSho(data).subscribe({
        next: (res: any) => {
          this.callApiToFetchAllSho();
          this.toastr.success(res.message);
        },
        error: (err) => {
          console.log(err.error.message);
        },
      });
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("Closed");
    });
  }

  openVerifyDialog(shoData: any) {
    let config: MatDialogConfig = {
      panelClass: "myBmmVerifyDialogClass",
      data: shoData,
    };
    const dialogRef = this.dialog.open(VerifyShoComponent, config);
    dialogRef.componentInstance.okClicked.subscribe(() => {
      console.log("clicked");
      let data = {
        isVerify: true,
        stateHandlerId: shoData.stateHandlerId,
      };
      this.userService.callApiToAdminVerifySho(data).subscribe({
        next: (res: any) => {
          this.callApiToFetchAllSho();
          this.toastr.success(res.message);
        },
        error: (err) => {
          console.log(err.error.message);
        },
      });
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("Closed");
    });
  }

  openViewShoDialog(shoData: any) {
    let config: MatDialogConfig = {
      panelClass: "myStateViewDialogClass",
      data: shoData,
    };
    const dialogRef = this.dialog.open(ShoViewComponent, config);

    dialogRef.afterClosed().subscribe((result) => {
      console.log("Closed");
    });
  }

  openEditShoDialog(shoData: any) {
    let config: MatDialogConfig = {
      panelClass: "myBmmEditDialogClass",
      data: shoData,
    };
    const dialogRef = this.dialog.open(EditShoComponent, config);

    dialogRef.afterClosed().subscribe((result) => {
      this.callApiToFetchAllSho();
      console.log("closed");
    });
  }

  gotoAccountSection(shoData: any) {
    console.log(shoData.stateHandlerId);
    this.router.navigate(["dashboard/sho-account", shoData.stateHandlerId]);
  }

  goBack() {
    this.router.navigate(["/dashboard/home"]);
  }
}
