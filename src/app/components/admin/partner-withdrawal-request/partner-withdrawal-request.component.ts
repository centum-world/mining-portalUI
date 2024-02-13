import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

interface PartnerWithdrawalRequest {
  p_userid: string;
  partner_wallet: number;
  request_date: Date;
  action: string;
}

@Component({
  selector: "app-partner-withdrawal-request",
  templateUrl: "./partner-withdrawal-request.component.html",
  styleUrls: ["./partner-withdrawal-request.component.css"],
})
export class PartnerWithdrawalRequestComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = [
    "serialNumber",
    "p_userid",
    "partner_wallet",
    "serviceCharge",
    "paybleAmount",
    "request_date",
    "action",
  ];
  dataSource: MatTableDataSource<PartnerWithdrawalRequest>;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.callApiToFetchPartnerWithdrawalRequest();
    this.dataSource.paginator = this.paginator;
  }

  callApiToFetchPartnerWithdrawalRequest() {
    this.userService.fetchWithdrawalRequestByAdmin().subscribe({
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
    data: PartnerWithdrawalRequest[]
  ): PartnerWithdrawalRequest[] {
    return data.map((item, index) => ({ ...item, serialNumber: index + 1 }));
  }

  approveRequest(value: any, id: any) {
    let data = {
      p_userid: value,
      id: id,
    };
    this.userService.approvedWithdrawalHistory(data).subscribe({
      next: (response: any) => {
        if (response) {
          this.callApiToFetchPartnerWithdrawalRequest();
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
