import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-franchise-account',
  templateUrl: './franchise-account.component.html',
  styleUrls: ['./franchise-account.component.css']
})
export class FranchiseAccountComponent implements OnInit {
  franchiseID: string
  bankDetails: []
  franchiseHistory = []
  approvedRequest = [];
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.route.params.subscribe(params => {
      this.franchiseID = params['id'];
    });
  }

  ngOnInit() {
    console.log(this.franchiseID)
  }

  tabChanged(event: any){
    if (event === 2) {
      console.log("event call 2");
      let data = {
        franchiseId: this.franchiseID,
      };
      this.userService.fetchParticularFranchiseBankDetails(data).subscribe({
        next: (res: any) => {
          console.log(res.result);
          this.bankDetails = res.result;
        },
        error: (error) => {
          this.toastr.warning(error.error.message);
        },
      });
    } else if (event === 0) {
      let data = {
        userId: this.franchiseID
      }
      this.userService.paymentRequestForSho(data).subscribe({
        next: (res: any) => {
          console.log(res.paymentRequests)
          this.franchiseHistory = res.paymentRequests;
        },
        error: (error) => {
          console.log(error.error.message)
        }
      })
    }
    else if(event === 1){
      let data = {
        userId: this.franchiseID
      }
      this.userService.fetchPaymentApprovedForAll(data).subscribe({
        next: (res: any) => {
          console.log(res)
          this.approvedRequest = res.paymentApprovals;
        },
        error: (error) => {
          console.log(error.error.message)
        }
      })
    }
  }

}
