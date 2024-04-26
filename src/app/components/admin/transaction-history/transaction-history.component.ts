import { Component, OnInit, ViewChild } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { Router } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

interface Data {
  partnerId: string;
  rigId: number;
  payableAmount: number;
  liquidity: string;
  payoutDate: string;
}

@Component({
  selector: "app-transaction-history",
  templateUrl: "./transaction-history.component.html",
  styleUrls: ["./transaction-history.component.css"],
})
export class TransactionHistoryComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = [
    "name",
    "partnerId",
    "rigId",
    "payableAmount",
    "liquidity",
    "payoutDate",
  ];

  selectedYear: number;
  selectedMonth: string;
  availableYears: number[] = [2022, 2023, 2024];
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

  isFetchingData: boolean = false;
  dataSource: MatTableDataSource<Data>;

  constructor(private userService: UserService, private router: Router) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.fetchTransactions();
  }

  fetchTransactions(): void {
    const requestData: any = {};

    if (this.selectedYear && this.selectedMonth) {
      requestData.currentMonth = this.getMonthNumericValue(this.selectedMonth);
      requestData.currentYear = this.selectedYear;
    }
    this.isFetchingData = true;

    this.userService.fetchTotalTransactions(requestData).subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.dataSource.data = res.data;
      },
      error: (error) => {},
    });
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

    const monthIndex = monthNames.indexOf(monthString);
    return monthIndex + 1;
  }

  showTable(): boolean {
    return (
      !this.isFetchingData && this.dataSource && this.dataSource.data.length > 0
    );
  }

  onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    console.log(this.dataSource.data);
    this.dataSource.data = this.dataSource.data.filter((item) =>
      item.partnerId.includes(inputValue)
    );
    if (!inputValue) {
      this.fetchTransactions();
    }
  }

  gotohome() {
    this.router.navigate(["/dashboard/home"]);
  }
}
