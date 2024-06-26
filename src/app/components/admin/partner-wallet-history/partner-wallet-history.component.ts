import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

interface PartnerWalletHistory {
  p_userid: string;
  walletAmount: number;
  wallet_update_date: Date;
}

@Component({
  selector: "app-partner-wallet-history",
  templateUrl: "./partner-wallet-history.component.html",
  styleUrls: ["./partner-wallet-history.component.css"],
})
export class PartnerWalletHistoryComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = [
    "serialNumber",
    "p_userid",
    "walletAmount",
    "wallet_update_date",
  ];
  dataSource: MatTableDataSource<PartnerWalletHistory>;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit() {
    this.callApiToFetchAllPartnerWalletHistory();
    this.dataSource.paginator = this.paginator;
  }

  callApiToFetchAllPartnerWalletHistory() {
    this.userService.partnerWalletShownInAdminPanel().subscribe({
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

  addSerialNumbers(data: PartnerWalletHistory[]): PartnerWalletHistory[] {
    return data.map((item, index) => ({ ...item, serialNumber: index + 1 }));
  }
  goBack() {
    this.router.navigate(["/dashboard/home"]);
  }
}
