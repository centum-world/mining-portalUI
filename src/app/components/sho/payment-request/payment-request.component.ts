import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { WithdrawDialogComponent } from '../diolog/withdraw-dialog/withdraw-dialog.component';
import { UserService } from 'src/app/service/user.service';
import { ConfirmApprovedComponent } from '../../admin/dialog/confirm-approved/confirm-approved.component';

@Component({
  selector: 'app-payment-request',
  templateUrl: './payment-request.component.html',
  styleUrls: ['./payment-request.component.css']
})
export class PaymentRequestComponent implements OnInit {
  requestHistroy = [];
  approvedHistory = [];
  constructor(private dialog:MatDialog, private userService:UserService) { }

  ngOnInit() {
    this.tabChanged(0);
  }

  withdrawDiolog(){
    let config: MatDialogConfig = {
      panelClass: 'myStateWithdrawDialogClass',
    };
    const dialogRef = this.dialog.open(WithdrawDialogComponent, config);
   
  }

  tabChanged(tab:any){
    if(tab === 0){
      let data = {
        userId:localStorage.getItem('stateHandlerId')
      }
      this.userService.paymentRequestForSho(data).subscribe({
        next:(res:any)=>{
          console.log(res.paymentRequests)
          this.requestHistroy = res.paymentRequests
        },
        error:(error)=>{
          console.log(error.error.message)
        }
      })
    }else if(tab === 1){
      let data = {
        userId:localStorage.getItem('stateHandlerId')
      }
      this.userService.fetchPaymentApprovedForAll(data).subscribe({
        next:(res:any)=>{
          console.log(res)
          this.approvedHistory = res.paymentApprovals
        },
        error:(error)=>{
          console.log(error.error.message)
        }
      })
    }
  }

}
