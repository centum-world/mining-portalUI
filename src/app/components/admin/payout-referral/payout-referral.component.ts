import { Component, OnInit, ViewChild } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { Router } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

interface DATA {
  userid: string;
  partnerid: string;
  amount: number;
  credit_date: string;
}

@Component({
  selector: "app-payout-referral",
  templateUrl: "./payout-referral.component.html",
  styleUrls: ["./payout-referral.component.css"],
})
export class PayoutReferralComponent implements OnInit {
  displayedColumns: string[] = ["userid", "partnerid", "amount", "credit_date"];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  dataSource: MatTableDataSource<DATA>;;

  allData: {
    userid: string;
    partnerid: string;
    amount: number;
    credit_date: string;
    userType: string;
  }[] = [];


  type: string = "REFERRAL";
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

  constructor(private userService: UserService, private router: Router) {
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {
    this.fetchTransactions();
    this.dataSource.paginator = this.paginator;
  }

  fetchTransactions(): void {
    const requestData: any = {};
    this.isFetchingData = true;

    this.userService.callApiToReferralPayout(requestData).subscribe(
      (response: any) => {
        this.allData = response.data;
        console.log(response.data);
        this.dataSource.data = this.allData.filter(
          (obj) => obj.userType === "MEMBER"
        );

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
      !this.isFetchingData && this.dataSource && this.dataSource.data.length > 0
    );
  }

  onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    console.log(this.dataSource.data);
    this.dataSource.data = this.allData.filter((item) =>
      item.userid.includes(inputValue)
    );
    if (!inputValue) {
      this.fetchTransactions();
    }
  }

  referralType() {
    console.log(this.allData);

    if (this.type === "REFERRAL") {
      this.dataSource.data = this.allData.filter(
        (obj) => obj.userType === "MEMBER"
      );
    } else {
      this.dataSource.data = this.allData.filter(
        (obj) => obj.userType === this.type
      );
     
    }
  }

  filterDataByYearAndMonth(data: any[], year: number, month: number): any[] {
    return data.filter((item) => {
      const creditDate = new Date(item.credit_date);
      return creditDate.getFullYear() === year && creditDate.getMonth() + 1 === month;
    });
  }

  fetchMonthWise(){  
   const month =  this.getMonthNumericValue(this.selectedMonth);
   this.dataSource.data = this.filterDataByYearAndMonth(this.dataSource.data, Number(this.selectedYear), month);
  }

  gotohome() {
    this.router.navigate(["/dashboard/home"]);
  }
}