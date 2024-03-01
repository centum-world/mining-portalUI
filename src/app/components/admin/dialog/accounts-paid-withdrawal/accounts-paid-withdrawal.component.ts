import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { UserService } from "src/app/service/user.service";

@Component({
  selector: "app-accounts-paid-withdrawal",
  templateUrl: "./accounts-paid-withdrawal.component.html",
  styleUrls: ["./accounts-paid-withdrawal.component.css"],
})
export class AccountsPaidWithdrawalComponent implements OnInit {
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
  payoutData = {
    totalPayout: 0,
    totalPartnerPayout: 0,
    totalBmmPayout: 0,
    totalFranchisePayout: 0,
    totalReferralPayout: 0,
    totalReferralPartnerPayout: 0,
  };
  monthData = {};
  constructor(
    public dialogRef: MatDialogRef<AccountsPaidWithdrawalComponent>,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.callApiToPayout();
  }
  closeModal(): void {
    this.dialogRef.close();
  }

  callApiToPayout() {
    this.userService.callApiToFilterTotalPayout().subscribe({
      next: (response: any) => {
        this.monthData = response.combinedMonthlyAmounts;
        this.payoutData.totalPayout = response.totalAmount;
        this.payoutData.totalPartnerPayout = response.totalPartnerAmount;
        this.payoutData.totalBmmPayout = response.totalAmountByUserType.BMM;
        this.payoutData.totalFranchisePayout =
          response.totalAmountByUserType.FRANCHISE;
        this.payoutData.totalReferralPayout =
          response.totalAmountByUserType.MEMBER;
        this.payoutData.totalReferralPartnerPayout =
          response.totalAmountByUserType.PARTNER;
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

  fetchMonthWise() {
    const month = this.getMonthNumericValue(this.selectedMonth);
    const monthYear = Number(this.selectedYear) + "-" + month;
    console.log(
      this.monthData[monthYear],
      Number(this.selectedYear) + "-" + month
    );
     this.payoutData.totalPayout = this.monthData[monthYear].totalAmount
    this.payoutData.totalPartnerPayout = this.monthData[monthYear].partnerAmount;
    this.payoutData.totalBmmPayout = this.monthData[monthYear].userTypeAmounts.BMM;

    this.payoutData.totalFranchisePayout =  this.monthData[monthYear].userTypeAmounts.FRANCHISE;
    this.payoutData.totalReferralPayout = this.monthData[monthYear].userTypeAmounts.MEMBER;
    this.payoutData.totalReferralPartnerPayout =   this.monthData[monthYear].userTypeAmounts.PARTNER;
  }
}
