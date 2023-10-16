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
  selector: 'app-withdrawal-success-history',
  templateUrl: './withdrawal-success-history.component.html',
  styleUrls: ['./withdrawal-success-history.component.css']
})
export class WithdrawalSuccessHistoryComponent implements OnInit {

  bdID: string;
  bdwithdrawalHistory = [];
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
      this.userService.businessDevFetchwithdrawalSuccessHistory(data).subscribe({
        next:(res:any)=>{
          console.log(res)
          this.bdwithdrawalHistory = res.withdrawalSuccess
          console.log(this.bdwithdrawalHistory)
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
