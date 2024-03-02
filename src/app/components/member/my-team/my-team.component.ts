import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { PartnerPayoutDetailsComponent } from "../modal/partner-payout-details/partner-payout-details.component";
import { Router } from "@angular/router";

interface MemberMyTeam {
  p_userid: string;
  name: string;
  lname: string;
  joinDate: Date;
  phone: number;
  email:string;
  // action: string;
}

@Component({
  selector: "app-my-team",
  templateUrl: "./my-team.component.html",
  styleUrls: ["./my-team.component.css"],
})
export class MyTeamComponent implements OnInit {
  partner_userid: "";
  indexOfLastPayment: any;
  lastPayOutAmount: any;
  lastPayOutMonth: any;
  monthlyPayment: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = [
    "serialNumber",
    "p_userid",
    "name",
    "phone",
    "email",
    "joinDate",
    // "action",
  ];
  dataSource: MatTableDataSource<MemberMyTeam>;
  userid = "";

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource([]);
  }
  partnerDetails: any = {};

  ngOnInit() {
    this.callApiToMyTeam();
    this.dataSource.paginator = this.paginator;
  }
  callApiToMyTeam() {
    let data = {
      p_reffered_id: localStorage.getItem("mrefferid"),
    };
    this.userService.useRefferalIdOfMemberToFetchMiningPartner(data).subscribe({
      next: (res: any) => {
        const dataWithSerial = this.addSerialNumbers(res.data);
        this.dataSource.data = dataWithSerial;
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }

  fetchPartnerDetails(userid: any) {
    this.partnerDetails.userid = userid;
    console.log(userid);
    this.partner_userid = userid;
    let data = {
      p_userid: userid,
    };

    this.userService.fetchPartnerDetailsFromMember(data).subscribe({
      next: (response: any) => {
        if (response) {
          this.partnerDetails.liquidity = response.data[0].p_liquidity;
          this.partnerDetails.dop = response.data[0].p_dop;
          this.partnerDetails.name = response.data[0].p_name;
          this.partnerDetails.lname = response.data[0].p_lname;
          this.partnerDetails.month_count = response.data[0].month_count;
          this.partnerDetails.partner_count = response.data[0].partner_count;
          this.partnerDetails.partner_status = response.data[0].partner_status;
        }
        let config: MatDialogConfig = {
          panelClass: "fetchPartnerDetailsDialogClass",
          data: this.partnerDetails,
        };
        const dialogRef = this.dialog.open(
          PartnerPayoutDetailsComponent,
          config
        );

        dialogRef.afterClosed().subscribe((result) => {
          console.log("The dialog was closed");
        });
      },
      error: (error) => {
        console.log(error.error.message);
      },
    });

    let lequidity = "";
    this.userService.fetchPartnerLiquidity(data).subscribe({
      next: (response: any) => {
        lequidity = response.data[0].p_liquidity;
        if (parseInt(lequidity) === 1200000) {
          this.partnerDetails.monthlyPayment = 22000;
        }
        if (parseInt(lequidity) === 600000) {
          this.partnerDetails.monthlyPayment = 11000;
        }
        if (parseInt(lequidity) === 300000) {
          this.partnerDetails.monthlyPayment = 5500;
        }
        if (parseInt(lequidity) === 200000) {
          this.partnerDetails.monthlyPayment = 3700;
        }
        if (parseInt(lequidity) === 100000) {
          this.partnerDetails.monthlyPayment = 1850;
        }
      },
      error: (error) => {
        this.toastr.error("Something went wrong", "Error");
      },
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addSerialNumbers(data: MemberMyTeam[]): MemberMyTeam[] {
    return data.map((item, index) => ({ ...item, serialNumber: index + 1 }));
  }

  goBack() {
    this.router.navigate(["/memberdashboard/home"]);
  }
}
