import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MatDialogConfig } from '@angular/material';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-franchise-withdrawal-request',
  templateUrl: './franchise-withdrawal-request.component.html',
  styleUrls: ['./franchise-withdrawal-request.component.css']
})
export class FranchiseWithdrawalRequestComponent implements OnInit {

  franchiseID: string;
  franchiseRequestHistory = [];
  franchiseApprovedHistory = [];
  franchiseBankDetails = [];
  franchiseWallet = 0;
  constructor(private route: ActivatedRoute, private dialog: MatDialog, private userService: UserService, private toastr: ToastrService) {
    this.route.params.subscribe(params => {
      this.franchiseID = params['id']; // Retrieve parameter 1
      console.log(this.franchiseID);
    });
  }

  ngOnInit() {
    this.tabChanged(0);
    // this.bdOwnData();
  }

  tabChanged(tab: any) {
    if (tab === 0) {
      let data = {
        userId: localStorage.getItem('franchiseId')
      }
      this.userService.paymentRequestForSho(data).subscribe({
        next: (res: any) => {
          console.log(res.paymentRequests)
          this.franchiseRequestHistory = res.paymentRequests
          console.log(this.franchiseRequestHistory)
        },
        error: (error => {
          console.log(error.error.message)
        })

      })

    }
  }

  // bdOwnData() {
  //   let data = {
  //     businessDeveloperId: this.franchiseID
  //   }
  //   this.userService.fetchBdPerticularDetials(data).subscribe({
  //     next: (res: any) => {
  //       console.log(res)
  //       this.franchiseWallet = res.bdDetails.bdWallet;
  //     },
  //     error: (err => {
  //       console.log(err.error.message)
  //     })
  //   })

  // }
}
