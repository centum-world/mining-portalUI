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
}

@Component({
  selector: "app-franchise-history-component",
  templateUrl: "./franchise-history-component.component.html",
  styleUrls: ["./franchise-history-component.component.css"],
})
export class FranchiseHistoryComponentComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

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

  dataSource: MatTableDataSource<franchise>;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.getAllFranchise();
    this.dataSource.paginator = this.paginator;
  }

  getAllFranchise() {
    this.userService.fetchAllFranchise().subscribe({
      next: (res: any) => {
        console.log(res.franchiseData);
        this.dataSource.data = res.franchiseData;
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openIsBlockDialog(franchiseData: any) {
    console.log(franchiseData);

    let config: MatDialogConfig = {
      height: "26%",
      width: "23%",
      panelClass: "myStateDialogClass",
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
      height: "26%",
      width: "23%",
      panelClass: "myStateDialogClass",
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

  openEditFranchiseDialog(data:any){

  }

  gotoFranchiseAccount(){
    
  }
}
