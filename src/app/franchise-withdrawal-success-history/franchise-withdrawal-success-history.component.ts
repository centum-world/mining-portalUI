import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MatDialogConfig } from '@angular/material';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-franchise-withdrawal-success-history',
  templateUrl: './franchise-withdrawal-success-history.component.html',
  styleUrls: ['./franchise-withdrawal-success-history.component.css']
})
export class FranchiseWithdrawalSuccessHistoryComponent implements OnInit {

  franchiseID: string;
  franchisewithdrawalHistory = [];
  franchiseApprovedHistory = [];
  franchiseBankDetails = [];
  constructor(private route: ActivatedRoute, private dialog: MatDialog, private userService : UserService, private toastr: ToastrService) { 
    this.route.params.subscribe(params => {
      this.franchiseID = params['id']; // Retrieve parameter 1
      console.log(this.franchiseID);
    });
  }

  ngOnInit() {
    this.tabChanged(0);
  }
  tabChanged(tab:any){
    if(tab === 0){
      let data = {
        userId : localStorage.getItem('franchiseId')
      }
      this.userService.fetchPaymentApprovedForAll(data).subscribe({
        next:(res:any)=>{
          console.log(res.paymentApprovals)
          this.franchisewithdrawalHistory = res.paymentApprovals
          console.log(this.franchisewithdrawalHistory)
        },
        error:(error=>{
          console.log(error.error.message)
        })

      })

    }
  }



}
