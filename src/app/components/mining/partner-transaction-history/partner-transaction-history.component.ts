import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-partner-transaction-history',
  templateUrl: './partner-transaction-history.component.html',
  styleUrls: ['./partner-transaction-history.component.css']
})
export class PartnerTransactionHistoryComponent implements OnInit {

  requestHistory: any[] = [];
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.payoutTransactionHistory();
  }
  payoutTransactionHistory() {
    let data = {
      partnerId: localStorage.getItem("partnerdetails"),
    };

    this.userService.apiToGetPartnerOwnPayoutTransactionTotal(data).subscribe({
      next: (res: any) => {
        console.log(res)
        if (res && res.data && Array.isArray(res.data)) {
          this.requestHistory = res.data;
        } else {
          console.error("Invalid data format received from server");
        }
      },
      error: (error) => {
        console.log(error.error.message);
      },
    });
  }
  gotoDashboard(){
    this.router.navigate(['/miningdashboard/home'])
  }

}
