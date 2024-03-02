import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-referral-payout",
  templateUrl: "./referral-payout.component.html",
  styleUrls: ["./referral-payout.component.css"],
})
export class ReferralPayoutComponent implements OnInit {
  originalRequestHistory: any[] = [];
  requestHistory: any[] = [];
  searchMonth: string = "";
  searchYear: string = "";
  searchUserId: string = "";

  months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  years: string[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.myReferralPayout();
    
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= currentYear - 10; year--) {
      this.years.push(year.toString());
    }
  }

  myReferralPayout() {
    let data = {
      partnerId: localStorage.getItem("partnerdetails"),
    };

    this.userService.callApiToFetchReferralPayoutForPartner(data).subscribe({
      next: (res: any) => {
        console.log(res)
        if (res && res.data && Array.isArray(res.data)) {
          this.originalRequestHistory = res.data;
          this.applySearch();
        } else {
          console.error("Invalid data format received from server");
        }
      },
      error: (error) => {
        console.log(error.error.message);
      },
    });
  }

  applySearch() {
    this.requestHistory = [...this.originalRequestHistory];

    // Filter data based on searchMonth, searchYear, and searchUserId
    this.requestHistory = this.requestHistory.filter(item => {
      const creditDate = new Date(item.credit_date);
      const monthMatch = this.searchMonth ? (creditDate.getMonth() + 1).toString().padStart(2, '0') === this.searchMonth : true;
      const yearMatch = this.searchYear ? creditDate.getFullYear().toString() === this.searchYear : true;
      const userIdMatch = this.searchUserId ? item.userid.toLowerCase().includes(this.searchUserId.toLowerCase()) : true;

      return monthMatch && yearMatch && userIdMatch;
    });
  }

  resetFilters() {
    // Reset all filters and fetch the original data
    this.searchMonth = "";
    this.searchYear = "";
    this.searchUserId = "";
    this.applySearch(); // This will fetch the original data
  }

  gotoDashboard(){
    this.router.navigate(['/miningdashboard/home'])
  }
}
