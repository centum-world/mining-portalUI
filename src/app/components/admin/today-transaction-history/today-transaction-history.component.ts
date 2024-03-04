// today-transaction-history.component.ts
import { Component, OnInit, ViewChild } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

interface Data {
  userId: string;
  rigid: number;
  amount: number;
  liquidity: string;
  date: string;
}
@Component({
  selector: "app-today-transaction-history",
  templateUrl: "./today-transaction-history.component.html",
  styleUrls: ["./today-transaction-history.component.css"],
})
export class TodayTransactionHistoryComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = [
    "userId",
    "rigid",
    "amount",
    "date",
    "liquidity",
  ];

  dataSource: MatTableDataSource<Data>;

  constructor(private userService: UserService) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {
    this.fetchTodayTransactions();
    this.dataSource.paginator = this.paginator;
  }

  fetchTodayTransactions(): void {
    const currentDate = new Date().toISOString().split("T")[0];

    const requestData = {
      currentDate: currentDate,
    };

    this.userService.fetchTotalTransactions(requestData).subscribe({
      next:(response: any) => {
        console.log(response,"hello")
        this.dataSource = response.data.map((transaction) => {
          return {
            userId: transaction.partnerId,
            rigid: transaction.rigId,
            amount: transaction.payableAmount,
            date: new Date(transaction.payoutDate),
            liquidity: transaction.liquidity,
          };
        });
      },
      error:(error) => {
        console.error("Error fetching today's transaction history", error);
      }
  });
  }
}
