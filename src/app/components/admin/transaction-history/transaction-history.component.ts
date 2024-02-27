// transaction-history.component.ts
import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "app-transaction-history",
  templateUrl: "./transaction-history.component.html",
  styleUrls: ["./transaction-history.component.css"],
})
export class TransactionHistoryComponent implements OnInit {
  displayedColumns: string[] = [
    "userId",
    "rigid",
    "amount",
    "date",
    "liquidity",
  ];
  dataSource: any[] = [];
  selectedYear: number;
  selectedMonth: string;
  availableYears: number[] = [2022, 2023, 2024]; // Adjust with your available years
  availableMonths: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Add a variable to track whether data is being fetched
  isFetchingData: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchTransactions();
  }

  fetchTransactions(): void {
    const requestData: any = {};

    if (this.selectedYear && this.selectedMonth) {
      requestData.currentMonth = this.getMonthNumericValue(this.selectedMonth);
      requestData.currentYear = this.selectedYear;

      console.log("Selected Year:", this.selectedYear);
      console.log("Selected Month:", this.selectedMonth);
      console.log("Month Numeric:", requestData.currentMonth);
    }
    console.log("Request Data:", requestData);

    // Set isFetchingData to true when starting to fetch data
    this.isFetchingData = true;

    this.userService.fetchTotalTransactions(requestData).subscribe(
      (response: any) => {
        this.dataSource = response.data.map((transaction) => {
          return {
            userId: transaction.partnerId,
            rigid: transaction.rigId,
            amount: transaction.payableAmount,
            date: transaction.payoutDate,
            liquidity: transaction.liquidity,
          };
        });

        // Set isFetchingData to false when data is fetched
        this.isFetchingData = false;
      },
      (error) => {
        console.error("Error fetching transaction history", error);

        // Set isFetchingData to false on error
        this.isFetchingData = false;
      }
    );
  }

  getMonthNumericValue(monthString: string): number {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Find the index of the month in the array
    const monthIndex = monthNames.indexOf(monthString);

    // Months are 0-indexed in JavaScript Date, so add 1
    return monthIndex + 1;
  }

  // Function to check whether to show the table or not
  showTable(): boolean {
    return (
      !this.isFetchingData && this.dataSource && this.dataSource.length > 0
    );
  }
}
