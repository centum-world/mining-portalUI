import { Component, OnInit, ViewChild } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";

interface TodaysTransactionHistory {
  refferPartner: string;
  referralAmount: string;
  joinDate: Date;
}

@Component({
  selector: "app-today-transaction-history",
  templateUrl: "./today-transaction-history.component.html",
  styleUrls: ["./today-transaction-history.component.css"],
})
export class TodayTransactionHistoryComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = [
    "serialNumber",
    "refferPartner",
    "referralAmount",
    "joinDate",
  ];
  dataSource: MatTableDataSource<TodaysTransactionHistory>;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 20];

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource<TodaysTransactionHistory>([]);
  }

  ngOnInit() {
    this.callApiToMyTeam();
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  callApiToMyTeam() {
    let data = {
      userId: localStorage.getItem("userdetail"),
    };
    this.userService.callApiToFetchTransactionHistory(data).subscribe({
      next: (res: any) => {
        console.log(res, 55);
        this.dataSource.data = res.data;
        // const dataWithSerial = this.addSerialNumbers(res.data);
        // this.dataSource.data = dataWithSerial;
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }


  // addSerialNumbers(
  //   data: TodaysTransactionHistory[]
  // ): TodaysTransactionHistory[] {
  //   return data.map((item, index) => ({ ...item, serialNumber: index + 1 }));
  // }

  goBack() {
    // Define the action to go back
  }
}
