import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material/dialog";
import { MatDialogConfig } from "@angular/material/dialog";
import { VerifyPartnerComponent } from "../dialog/verify-partner/verify-partner.component";
import { BlockMiningPartnerComponent } from "../dialog/block-mining-partner/block-mining-partner.component";
import { EditPartnerComponent } from "../dialog/edit-partner/edit-partner.component";
import { Router } from "@angular/router";
import { PartnerViewComponent } from "../dialog/partner-view/partner-view.component";
import { PartnerQueryComponent } from "../dialog/partner-query/partner-query.component";
interface Partner {
  P_userid: string;
  p_name: string;
  p_lname: string;
  p_phone: string;
  p_email: string;
  p_gender: string;
  p_refferal_id: string;
  p_reffered_id: string;
  p_state: string;
  p_dob: Date;
  p_dop: string;
  p_liquidity: Number;
  p_address: string;
  p_aadhar: Number;
  p_nominee_name: string;
  p_nominee_phone: Number;
  p_nominee_aadhar: Number;
  status: string;
  isBlocked: string;
  actions: string;
}

@Component({
  selector: "app-partner-history",
  templateUrl: "./partner-history.component.html",
  styleUrls: ["./partner-history.component.css"],
})
export class PartnerHistoryComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = [
    "p_userid",
    "p_name",
    "p_lname",
    "p_email",
    "p_phone",
    "p_dob",
    "p_refferal_id",
    "p_reffered_id",
    "p_address",
    "p_state",
    "p_liquidity",
    "maxPayableCount",
    "p_dop",
    "p_aadhar",
    "p_nominee_name",
    "p_nominee_phone",
    "p_nominee_aadhar",
    "status",
    "isBlocked",
    "actions",
  ];
  dataSource: MatTableDataSource<Partner>;
  selected = "onetime";
  afterData: [] = [];
  beforeData: [] = [];

  payableCount: number = 0;
  payoutDate: string = "";

  allPayout: [] = [];
  partnerID: string = "";

  rig: any[] = [];
  mergeData: any[] = [];

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.callApiToFetchAllPartner();
    this.dataSource.paginator = this.paginator;
  }

  callApiToFetchAllPartner() {
    this.userService.adminFetchAllMiningPartner().subscribe({
      next: (res: any) => {
        console.log(res.afterDec152023);
        this.rig = res.afterDec152023;
        console.log(this.rig, 99);
       if(this.selected === 'onetime'){
        this.afterData = res.afterDec152023;
        var rigIds: string[] = res.afterDec152023.map(
          (item: any) => item.rigId
        );
        this.apiCallToPayoutCount(rigIds, this.afterData)
       }else{
        this.beforeData = res.beforeDec152023;
        var rigIds: string[] = res.beforeDec152023.map(
          (item: any) => item.rigId
        );
        this.apiCallToPayoutCount(rigIds, this.beforeData)
       }
        // this.dataSource.data = res.afterDec152023;

       
        
        
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }

  onSelectionChange() {
    this.callApiToFetchAllPartner();
    
    // if (this.selected === "onetime") {
    //   this.dataSource.data = this.mergeData;
    // } else {
    //   this.dataSource.data = this.beforeData;
    // }
  }

  openMiningPartnerVerifyDialog(miningPartnerData: any) {
    let config: MatDialogConfig = {
      panelClass: "verifyPartnerDialogClass",
      data: miningPartnerData,
    };
    const dialogRef = this.dialog.open(VerifyPartnerComponent, config);
    dialogRef.componentInstance.okClicked.subscribe(() => {
      console.log("clicked");
      let verifyDate = new Date();
      let data = {
        isVerify: true,
        p_userid: miningPartnerData.p_userid,
        verifyDate,
      };
      this.userService.adminVerifyPartner(data).subscribe({
        next: (res: any) => {
          this.callApiToFetchAllPartner();
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

  // -----------------

  openViewPartnerDialog(partner: any) {
    let config: MatDialogConfig = {
      panelClass: "myPartnerViewDialogClass",
      data: partner,
    };
    const dialogRef = this.dialog.open(PartnerViewComponent, config);

    dialogRef.afterClosed().subscribe((result) => {
      console.log("Closed");
    });
  }
  openIsBlockPartnerDialog(miningPartnerData: any) {
    console.log(miningPartnerData);

    let config: MatDialogConfig = {
      panelClass: "myPartnerBlockStateDialogClass",
      data: miningPartnerData,
    };
    const dialogRef = this.dialog.open(BlockMiningPartnerComponent, config);
    dialogRef.componentInstance.okClicked.subscribe(() => {
      let data = {
        isBlocked: !miningPartnerData.isBlocked,
        p_userid: miningPartnerData.p_userid,
      };
      this.userService.adminBlockUnblockPartner(data).subscribe({
        next: (res: any) => {
          this.callApiToFetchAllPartner();
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

  openPartnerEditDialog(miningPartnerData: any) {
    let config: MatDialogConfig = {
      panelClass: "partnerEditDialogClass",
      data: miningPartnerData,
    };
    const dialogRef = this.dialog.open(EditPartnerComponent, config);

    dialogRef.afterClosed().subscribe((result) => {
      this.callApiToFetchAllPartner();
      console.log("closed");
    });
  }

  apiCallToPayoutCount(rigIds: any, allData: any) {
    let data = {
      rigId: rigIds,
    };

    this.userService.callApiToFetchAllPartnerPayoutCount(data).subscribe({
      next: (res: any) => {
        console.log(res.maxPayableCounts,allData, 217);
        this.mergeData = allData.map((obj:any, index:any) => ({
          ...obj,
          ...res.maxPayableCounts[index],
        }));
        this.dataSource.data = this.mergeData;
        // console.log(this.mergeData)
        
      },
      error: (error) => {
        this.toastr.warning(error.error.message);
      },
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  gotoPartnerAccountSection(miningPartnerData: any) {
    this.router.navigate([
      "dashboard/partner-account",
      miningPartnerData.p_userid,
      this.selected,
    ]);
  }

  goBack() {
    this.router.navigate(["/dashboard/home"]);
  }

  queryPartner(partner: any) {
    let config: MatDialogConfig = {
      panelClass: "partnerQueryDialogClass",
      data: partner,
    };
    const dialogRef = this.dialog.open(PartnerQueryComponent, config);
  }
}
