import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { UserService } from 'src/app/service/user.service';
import { BusinessWithdrawDialogComponent } from '../modal/business-withdraw-dialog/business-withdraw-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bdpayment-request',
  templateUrl: './bdpayment-request.component.html',
  styleUrls: ['./bdpayment-request.component.css']
})
export class BDpaymentRequestComponent implements OnInit {
  requestHistroy = [];
  approvedHistory = [];
  constructor(private dialog:MatDialog, 
    private userService:UserService,
    private router:Router
    ) { }

  ngOnInit() {
    this.tabChanged(0);
  }


  withdrawDialog(){
    let config: MatDialogConfig = {
      panelClass: 'myStateWithdrawDialogClass',
    };
    const dialogRef = this.dialog.open(BusinessWithdrawDialogComponent, config);
  }

  tabChanged(tab:any){
    if(tab === 0){
      let data = {
        userId:localStorage.getItem('bdHandlerID')
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
        userId:localStorage.getItem('bdHandlerID')
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

  goBack(){
    this.router.navigate(['/bd-dashboard/home'])
  }

}
