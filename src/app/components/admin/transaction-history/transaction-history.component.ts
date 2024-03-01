// // transaction-history.component.ts
// import { Component, OnInit, ViewChild } from "@angular/core";
// import { UserService } from "src/app/service/user.service";
// import { Router } from "@angular/router";



// @Component({
//   selector: "app-transaction-history",
//   templateUrl: "./transaction-history.component.html",
//   styleUrls: ["./transaction-history.component.css"],
// })
// export class TransactionHistoryComponent implements OnInit {
//   displayedColumns: string[] = [
//     "userId",
//     "rigid",
//     "amount",
//     "liquidity",
//     "date",
//   ];

  


//   dataSource: any[] = [];
//   selectedYear: number;
//   selectedMonth: string;
//   availableYears: number[] = [2022, 2023, 2024];
//   availableMonths: string[] = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   isFetchingData: boolean = false;

//   constructor(private userService: UserService, private router : Router) {}

//   ngOnInit(): void {
//     this.fetchTransactions();
//   }

//   fetchTransactions(): void {
//     const requestData: any = {};

//     if (this.selectedYear && this.selectedMonth) {
//       requestData.currentMonth = this.getMonthNumericValue(this.selectedMonth);
//       requestData.currentYear = this.selectedYear;
//     }
//     this.isFetchingData = true;

//     this.userService.fetchTotalTransactions(requestData).subscribe(
//       (response: any) => {
//         this.dataSource = response.data.map((transaction:any) => {
//           return {
//             userId: transaction.partnerId,
//             rigid: transaction.rigId,
//             amount: transaction.payableAmount,
//             date: transaction.payoutDate,
//             liquidity: transaction.liquidity,
//           };
//         });
//         this.isFetchingData = false;
//       },
//       (error) => {
//         console.error("Error fetching transaction history", error);
//         this.isFetchingData = false;
//       }
//     );
//   }

//   getMonthNumericValue(monthString: string): number {
//     const monthNames = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];

//     const monthIndex = monthNames.indexOf(monthString);
//     return monthIndex + 1;
//   }
//   showTable(): boolean {
//     return (
//       !this.isFetchingData && this.dataSource && this.dataSource.length > 0
//     );
//   }

//   onInputChange(event: Event): void {
//     const inputValue = (event.target as HTMLInputElement).value;
//     console.log(this.dataSource)
//     this.dataSource = this.dataSource.filter(item => item.userId.includes(inputValue))
//     if(!inputValue){
//       this.fetchTransactions();
//     }
//   }

//   gotohome(){
//     this.router.navigate(["/dashboard/home"]);
//   }
// }



// transaction-history.component.ts
import { Component, OnInit, ViewChild } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { Router } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

interface DATA {
  userId: string;
  rigid: number;
  amount: number;
  liquidity: string;
  date: string;
}

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
    "liquidity",
    "date",
  ];

  dataSource = new MatTableDataSource<DATA>();

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

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

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.fetchTransactions();
  }

  fetchTransactions(): void {
    const requestData: any = {};

    if (this.selectedYear && this.selectedMonth) {
      requestData.currentMonth = this.getMonthNumericValue(
        this.selectedMonth
      );
      requestData.currentYear = this.selectedYear;
    }
    this.isFetchingData = true;

    this.userService.fetchTotalTransactions(requestData).subscribe(
      (response: any) => {
        this.dataSource.data = response.data.map((transaction: any) => {
          return {
            userId: transaction.partnerId,
            rigid: transaction.rigId,
            amount: transaction.payableAmount,
            date: transaction.payoutDate,
            liquidity: transaction.liquidity,
          };
        });
        this.isFetchingData = false;
      },
      (error) => {
        console.error("Error fetching transaction history", error);
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

    const monthIndex = monthNames.indexOf(monthString);
    return monthIndex + 1;
  }

  showTable(): boolean {
    return (
      !this.isFetchingData &&
      this.dataSource &&
      this.dataSource.data.length > 0
    );
  }

  onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    console.log(this.dataSource.data);
    this.dataSource.data = this.dataSource.data.filter((item) =>
      item.userId.includes(inputValue)
    );
    if (!inputValue) {
      this.fetchTransactions();
    }
  }

  gotohome() {
    this.router.navigate(["/dashboard/home"]);
  }
}
