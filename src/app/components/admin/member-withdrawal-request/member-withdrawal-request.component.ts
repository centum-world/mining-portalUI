import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

interface MemberWithdrawalRequest {
  m_userid: string;
  member_wallet: number;
  reffer_p_userid: string;
  request_date: Date;
  action: string;
}

@Component({
  selector: "app-member-withdrawal-request",
  templateUrl: "./member-withdrawal-request.component.html",
  styleUrls: ["./member-withdrawal-request.component.css"],
})
export class MemberWithdrawalRequestComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = [
    "serialNumber",
    "m_userid",
    "member_wallet",
    "serviceCharge",
    "paybleAmount",
    "refferal",
    "request_date",
    "action",
  ];
  dataSource: MatTableDataSource<MemberWithdrawalRequest>;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.callApiToFetchMemberWithdrawalRequest();
    this.dataSource.paginator = this.paginator;
  }

  callApiToFetchMemberWithdrawalRequest() {
    this.userService.memberWithdrawalRequest().subscribe({
      next: (res: any) => {
        const dataWithSerial = this.addSerialNumbers(res.data);
        this.dataSource.data = dataWithSerial;
      },
      error: (err) => {
        console.log(err.message);
      },
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addSerialNumbers(data: MemberWithdrawalRequest[]): MemberWithdrawalRequest[] {
    return data.map((item, index) => ({ ...item, serialNumber: index + 1 }));
  }

  approveRequest(value: any, id: any) {
    console.log(id, value);
    let data = {
      m_userid: value,
      id: id,
    };
    this.userService.adminWillApprovedMemberRequest(data).subscribe({
      next: (response: any) => {
        if (response) {
          this.callApiToFetchMemberWithdrawalRequest();
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
