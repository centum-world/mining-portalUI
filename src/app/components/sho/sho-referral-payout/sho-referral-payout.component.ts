import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sho-referral-payout',
  templateUrl: './sho-referral-payout.component.html',
  styleUrls: ['./sho-referral-payout.component.css']
})
export class ShoReferralPayoutComponent implements OnInit {

  shoID: string;
  bmmReferralPayout = [];
  originalRequestHistory: any[] = [];
  requestHistory: any[] = [];
  searchMonth: string = "";
  searchYear: string = "";
  searchUserId: string = "";
  myWallet = 0;

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
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.shoID = localStorage.getItem('stateHandlerId');
  }

  ngOnInit() {
    this.callApiToShoDetails();
    this.callApiToReferralPayout();
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= currentYear - 10; year--) {
      this.years.push(year.toString());
    }
  }

  callApiToReferralPayout() {
    let data = {
      userid: this.shoID,
      userType: localStorage.getItem('userType')
    };
    this.userService.memberReferralPayoutHistory(data).subscribe({
      next: (res: any) => {
        console.log(res);
        this.originalRequestHistory = res.data;
        this.applySearch(); // Apply initial search with all data
      },
      error: (error) => {
        console.log(error.error.message);
      }
    });
  }

  callApiToShoDetails() {
    let data = {
      stateHandlerId: this.shoID
    };
    this.userService.shoDetails(data).subscribe({
      next: (res: any) => {
        console.log(res.sho.stateHandlerWallet);
        this.myWallet = res.sho.stateHandlerWallet;
      },
      error: (err => {
        console.log(err.error.message);
      })
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

  goBack() {
    this.router.navigate(['/statedashboard/home']);
  }
}
