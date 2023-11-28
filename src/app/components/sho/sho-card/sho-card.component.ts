import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StateAddBankComponent } from '../../modal/state-add-bank/state-add-bank.component';
import { UserService } from 'src/app/service/user.service';
import { StateViewBankDetailsComponent } from '../../modal/state-view-bank-details/state-view-bank-details.component';
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sho-card',
  templateUrl: './sho-card.component.html',
  styleUrls: ['./sho-card.component.css']
})
export class ShoCardComponent implements OnInit {
  totalWithdrawalOfState:any;
  totalWalletOfState:any;
  bankDetails=[];
  displayStateHandlerId = localStorage.getItem('stateHandlerId');
  displayStateHandlerReferralId = localStorage.getItem('stateRefferalId')
  constructor(private dialog:MatDialog,private userService:UserService,
     private router:Router,
     private toastr:ToastrService
     ) { }

  ngOnInit() {
    this.callApiToFetchStateTotalWithdrawal()
    this.callApiToFetchStateTotalWallet()
  }

  stateAddBankDialog(){

    let config:MatDialogConfig = {
       panelClass:'stateAddBankDialogClass'
    };
    const dialogRef = this.dialog.open(StateAddBankComponent,config);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Do something with the result if needed
    });
  }

  stateViewBankDetailsDialog(){

    let data = {
      userId :localStorage.getItem('stateHandlerId')
     }
     this.userService.fetchStateBankDetails(data).subscribe({
      next: (response: any) => {
        if (response) {
            console.log(response.result)
           
        }
        let config:MatDialogConfig = {
          panelClass:'stateViewBankDetailsDialogClass', data:response.result
          };
          const dialogRef = this.dialog.open(StateViewBankDetailsComponent,config);
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            // Do something with the result if needed
          })
      },
      error: error => {
       console.log(error)
      }
    })
    
  }

  callApiToFetchStateTotalWithdrawal(){
    let data = {
      userId:localStorage.getItem('stateHandlerId')
    }
    this.userService.fetchFranchiseTotalWithdrawal(data).subscribe({
      next: (result: any) => {
        if (result) {
           console.log(result)

          this.totalWithdrawalOfState= result.data || 0;
        }

      },
      error: error => {
        this.toastr.error('Something went wrong', 'Error');
      }
    })
  }

  callApiToFetchStateTotalWallet(){
    let data = {
      stateHandlerId:localStorage.getItem('stateHandlerId')
    }
    this.userService.shoDetails(data).subscribe({
      next: (result: any) => {
        if (result) {
           console.log(result.sho.stateHandlerWallet)

          this.totalWalletOfState= result.sho.stateHandlerWallet || 0;
        }

      },
      error: error => {
        this.toastr.error('Something went wrong', 'Error');
      }
    })
  }

  addFanchise(){
    this.router.navigate(['/statedashboard/add-franchise'])
  }
  transaction(){
    this.router.navigate(['/statedashboard/withdrawal-list'])
  }
  viewWithdrawalRequestList(){
    this.router.navigate(['/statedashboard/withdrawal-list'])
  }
  viewWithdrawalSuccessList(){
    this.router.navigate(['/statedashboard/withdrawal-list'])
  }
  partnerMyTeam(){
    this.router.navigate(['/statedashboard/partner-team'])
  }

  udgrade(){
    this.router.navigate(['/statedashboard/promotion'])
  }
}
