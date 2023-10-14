// withdrawal-request-history.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MatDialogConfig } from '@angular/material';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';

interface BusinessDevWithdrawalRequest {
  amount: number;
  paymentBy: string;
  requestDate: Date;
  serviceCharge: number;
  payableAmount: number;
}

@Component({
  selector: 'app-withdrawal-request-history',
  templateUrl: './withdrawal-request-history.component.html',
  styleUrls: ['./withdrawal-request-history.component.css']
})
export class WithdrawalRequestHistoryComponent implements OnInit {
  bdID: string;
  bdRequestHistory = [];
  bdApprovedHistory = [];
  bdBankDetails = [];
  bdWallet=0;
  constructor(private route: ActivatedRoute, private dialog: MatDialog, private userService : UserService, private toastr: ToastrService) { 
    this.route.params.subscribe(params => {
      this.bdID = params['id']; // Retrieve parameter 1
      console.log(this.bdID);
    });
  }

  ngOnInit() {
    this.tabChanged(0);
    this.bdOwnData();
  }

  tabChanged(tab:any){
    if(tab === 0){
      let data = {
        userId : localStorage.getItem('bdHandlerID')
      }
      this.userService.businessDevFetchwithdrawalRequest(data).subscribe({
        next:(res:any)=>{
          console.log(res)
          this.bdRequestHistory = res.withdrawalRequest
          console.log(this.bdRequestHistory)
        },
        error:(error=>{
          console.log(error.error.message)
        })

      })

    }
  }

  bdOwnData(){
   let data = {
    businessDeveloperId: this.bdID
   }
   this.userService.fetchBdPerticularDetials(data).subscribe({
    next:(res:any)=>{
      console.log(res)
      this.bdWallet = res.bdDetails.bdWallet;
    },
    error:(err=>{
      console.log(err.error.message)
    })
   })
    
  }



}
