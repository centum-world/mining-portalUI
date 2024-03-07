// today-transaction-history.component.ts
import { Component, OnInit, ViewChild } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";

interface AllTransaction {
  partnerId: string;
  rigId: string;
  payableAmount: number;
  liquidity: number;
  payoutDate: string;
}
@Component({
  selector: "app-today-transaction-history",
  templateUrl: "./today-transaction-history.component.html",
  styleUrls: ["./today-transaction-history.component.css"],
})
export class TodayTransactionHistoryComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = [
    "partnerId",
    "rigId",
    "payableAmount",
    "liquidity",
    "payoutDate",
  ];

  dataSource: MatTableDataSource<AllTransaction>;

  constructor(private userService: UserService,  private router: Router) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.fetchTodayTransactions();
  }

  fetchTodayTransactions(): void {
    const currentDate = new Date().toISOString().split("T")[0];

    const requestData = {
      currentDate: currentDate,
    };

    this.userService.fetchTotalTransactions(requestData).subscribe({
      next:(response: any) => {
        this.dataSource.data = response.data;
      },
      error:(error) => {
        console.error("Error fetching today's transaction history", error);
      }
  });
  }

  gotohome(){
    this.router.navigate(["/dashboard/home"]);
  }
}
