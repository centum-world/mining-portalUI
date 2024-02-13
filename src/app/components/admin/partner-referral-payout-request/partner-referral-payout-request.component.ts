import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

interface PartnerReferralPayoutRequest {
  p_userid: string;
  partner_wallet: number;
  reffer_p_userid: string;
  request_date: Date;
  action: string;
}

@Component({
  selector: "app-partner-referral-payout-request",
  templateUrl: "./partner-referral-payout-request.component.html",
  styleUrls: ["./partner-referral-payout-request.component.css"],
})
export class PartnerReferralPayoutRequestComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = [
    "serialNumber",
    "p_userid",
    "partner_wallet",
    "serviceCharge",
    "paybleAmount",
    "refferal",
    "request_date",
    "action",
  ];
  dataSource: MatTableDataSource<PartnerReferralPayoutRequest>;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.callApiToFetchPartnerReferralPayoutRequest();
    this.dataSource.paginator = this.paginator;
  }

  callApiToFetchPartnerReferralPayoutRequest() {
    this.userService.fetchPartnerRefferalAmountRequest().subscribe({
      next: (res: any) => {
        const dataWithSerial = this.addSerialNumbers(res.data);
        this.dataSource.data = dataWithSerial;
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addSerialNumbers(
    data: PartnerReferralPayoutRequest[]
  ): PartnerReferralPayoutRequest[] {
    return data.map((item, index) => ({ ...item, serialNumber: index + 1 }));
  }

  approveRequest(value: any, id: any) {
    let data = {
      p_userid: value,
      id: id,
    };
    this.userService.approvePartnerRefferalWithdrawalRequest(data).subscribe({
      next: (response: any) => {
        if (response) {
          this.callApiToFetchPartnerReferralPayoutRequest();
          this.toastr.success("Request Approved", "Success");
        }
      },
      error: (error) => {
        this.toastr.error("Something went wrong!");
      },
    });
  }

  goBack() {
    this.router.navigate(["/dashboard/home"]);
  }
}
