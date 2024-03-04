import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material/dialog";
import { BlockFranchiseComponent } from "../components/admin/dialog/block-franchise/block-franchise.component";
import { MatDialogConfig } from "@angular/material/dialog";
import { VerifyFranchiseComponent } from "../components/admin/dialog/verify-franchise/verify-franchise.component";
import { ViewFranchiseComponent } from "../components/admin/dialog/view-franchise/view-franchise.component";
import { AdminEditFranchiseComponent } from "../components/admin/dialog/admin-edit-franchise/admin-edit-franchise.component";
import { Router } from "@angular/router";
interface franchise {
  franchiseId: "";
  fname: string;
  lname: string;
  phone: string;
  email: string;
  gender: string;
  referralId: string;
  franchiseState: string;
  franchiseCity: string;
  actions: string;
  userType:string;
}

@Component({
  selector: "app-franchise-history-component",
  templateUrl: "./franchise-history-component.component.html",
  styleUrls: ["./franchise-history-component.component.css"],
})
export class FranchiseHistoryComponentComponent implements OnInit {
  @ViewChild('paginatorVerified', { static: true }) paginatorVerified: MatPaginator;
  @ViewChild('paginatorUnverified', { static: true }) paginatorUnverified: MatPaginator;
  @ViewChild('paginatorUpgradeDowngrade', { static: true }) paginatorUpgradeDowngrade: MatPaginator;

  displayedColumns: string[] = [
    "franchiseId",
    "fname",
    "lname",
    "email",
    "phone",
    "gender",
    "referralId",
    "franchiseState",
    "franchiseCity",
    "actions",
  ];

  downgradeColumns: string[] = [
    "franchiseId",
    "fname",
    "lname",
    "email",
    "phone",
    "gender",
    "referralId",
    "franchiseState",
    "franchiseCity",
    "userType"
  ];

  verifiedDataSource: MatTableDataSource<franchise>;
  unverifiedDataSource: MatTableDataSource<franchise>;
  upgradeDowngradeDataSource: MatTableDataSource<franchise>;


  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.verifiedDataSource = new MatTableDataSource([]);
    this.unverifiedDataSource = new MatTableDataSource([]);
    this.upgradeDowngradeDataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.tabChanged(0);
    this.getAllFranchise();
     this.verifiedDataSource.paginator = this.paginatorVerified;
     this.unverifiedDataSource.paginator = this.paginatorUnverified;
     this.upgradeDowngradeDataSource.paginator = this.paginatorUpgradeDowngrade;
  }

  tabChanged(event : any){
    console.log(event)
    if(event === 0){
      this.userService.CallApifetchVerifiedFranchise().subscribe({
        next: (res: any) => {
          console.log(res.data);
          this.verifiedDataSource.data = res.data;
          // this.verifiedDataSource.paginator = this.paginator
        },
        error: (err) => {
          console.log(err.message);
        },
      });
    }else if(event === 1){
      this.userService.CallApifetchUnVerifiedFranchise().subscribe({
        next: (res: any) => {
          console.log(res.data);
          this.unverifiedDataSource.data = res.data;
          // this.unverifiedDataSource.paginator = this.paginator;
        },
        error: (err) => {
          console.log(err.message);
        },
      });
    }else if(event === 2){
      
      this.userService.CallApiFetchUpgradeDowngradeFranchise().subscribe({
        next: (res: any) => {
          console.log(res.data);
          this.upgradeDowngradeDataSource.data = res.data;
          // this.upgradeDowngradeDataSource.paginator = this.paginator;
        },
        error: (err) => {
          console.log(err.message);
        },
      });
    }
  }

  getAllFranchise() {
    this.userService.CallApifetchVerifiedFranchise().subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.verifiedDataSource.data = res.data;
        // this.verifiedDataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }

  applyFilter(filterValue: string) {
     this.verifiedDataSource.filter = filterValue.trim().toLowerCase();
    this.unverifiedDataSource.filter = filterValue.trim().toLowerCase();
    this.upgradeDowngradeDataSource.filter = filterValue.trim().toLowerCase();
  }

  openIsBlockDialog(franchiseData: any) {
    console.log(franchiseData);

    let config: MatDialogConfig = {
      panelClass: "blockFranchiseDialogClass",
      data: franchiseData,
    };
    const dialogRef = this.dialog.open(BlockFranchiseComponent, config);
    dialogRef.componentInstance.okClicked.subscribe(() => {
      console.log("clicked");
      let data = {
        isBlocked: !franchiseData.isBlocked,
        franchiseId: franchiseData.franchiseId,
      };
      this.userService.adminBlockFranchise(data).subscribe({
        next: (res: any) => {
          console.log("------->", res);
          this.getAllFranchise();
          this.toastr.success(res.message);
        },
        error: (err) => {
          console.log(err);
        },
      });
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("Closed");
    });
  }

  openVerifyDialog(franchiseData: any) {
    let config: MatDialogConfig = {
      panelClass: "VerifyFranchiseDialogClass",
      data: franchiseData,
    };
    const dialogRef = this.dialog.open(VerifyFranchiseComponent, config);
    dialogRef.componentInstance.okClicked.subscribe(() => {
      console.log("clicked");
      let data = {
        isVerify: true,
        franchiseId: franchiseData.franchiseId,
      };
      this.userService.adminVerifyFranchise(data).subscribe({
        next: (res: any) => {
          console.log(res);
          this.getAllFranchise();
          this.toastr.success(res.message);
        },
        error: (err) => {
          console.log(err);
        },
      });
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("Closed");
    });
  }

  viewFranchiseDocument(franchiseData: any) {
    let config: MatDialogConfig = {
      panelClass: "myFranchiseViewDialogClass",
      data: franchiseData,
    };
    const dialogRef = this.dialog.open(ViewFranchiseComponent, config);

    dialogRef.afterClosed().subscribe((result) => {
      console.log("Closed");
    });
  }

  openEditFranchiseDialog(franchiseData: any) {
    let config: MatDialogConfig = {
      panelClass: "myFranchiseEditDialogClass",
      data: franchiseData,
    };
    const dialogRef = this.dialog.open(AdminEditFranchiseComponent, config);
    dialogRef.componentInstance.okClicked.subscribe(() => {
      console.log("heeeeeeeeeeeelo")
      this.getAllFranchise();
    })


    dialogRef.afterClosed().subscribe((result) => {
      console.log("closed");
    });
  }

  gotoFranchiseAccount(franchiseData: any){
    console.log( franchiseData.franchiseId)
    this.router.navigate(['dashboard/franchise-account', franchiseData.franchiseId])
  }
  goBack(){
    this.router.navigate(['/dashboard/home'])
  }

}
