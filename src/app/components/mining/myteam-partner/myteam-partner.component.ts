import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { MatDialogConfig } from "@angular/material";
import { PartnerMyteamAccountComponent } from "../dialog/partner-myteam-account/partner-myteam-account.component";

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
  actions: string;
}
@Component({
  selector: "app-myteam-partner",
  templateUrl: "./myteam-partner.component.html",
  styleUrls: ["./myteam-partner.component.css"],
})
export class MyteamPartnerComponent implements OnInit {
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
    "p_aadhar",
    "p_nominee_name",
    "p_nominee_phone",
    "p_nominee_aadhar",
    "status",
    "actions",
  ];
  dataSource: MatTableDataSource<Partner>;

  constructor(
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.myteam();
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  myteam() {
    let data = {
      referralId: localStorage.getItem("prefferid"),
    };
    this.userService.partnerMyTeam(data).subscribe({
      next: (res: any) => {
        this.dataSource.data = res.result;
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }

  gotoPartnerAccountSection(partner: any) {
    let config: MatDialogConfig = {
      panelClass: "myteamPartnerDialogClass",
      data: partner,
    };
    const dialogRef = this.dialog.open(PartnerMyteamAccountComponent, config);
    dialogRef.afterClosed().subscribe((result) => {
      console.log("Closed");
    });
  }

  referralPayoutPartner() {
    this.router.navigate(["/miningdashboard/referral-payout"]);
  }
  goBack() {
    this.router.navigate(["/miningdashboard"]);
  }
}
