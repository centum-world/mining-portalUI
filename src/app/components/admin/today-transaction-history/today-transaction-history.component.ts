// today-transaction-history.component.ts
import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "app-today-transaction-history",
  templateUrl: "./today-transaction-history.component.html",
  styleUrls: ["./today-transaction-history.component.css"],
})
export class TodayTransactionHistoryComponent implements OnInit {
  displayedColumns: string[] = [
    "userId",
    "rigid",
    "amount",
    "date",
    "liquidity",
  ];
  dataSource: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchTodayTransactions();
  }

  fetchTodayTransactions(): void {
    const currentDate = new Date().toISOString().split("T")[0];

    const requestData = {
      currentDate: currentDate,
    };

    this.userService.fetchTotalTransactions(requestData).subscribe(
      (response: any) => {
        this.dataSource = response.data.map((transaction) => {
          return {
            userId: transaction.partnerId,
            rigid: transaction.rigId,
            amount: transaction.amount,
            date: new Date(transaction.credited_date),
            liquidity: transaction.liquidity,
          };
        });
      },
      (error) => {
        console.error("Error fetching today's transaction history", error);
      }
    );
  }
}
