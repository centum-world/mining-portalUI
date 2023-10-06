import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-withdraw-dialog',
  templateUrl: './withdraw-dialog.component.html',
  styleUrls: ['./withdraw-dialog.component.css']
})
export class WithdrawDialogComponent implements OnInit {

  amount:number;
  primaryAccount="";
  constructor(private userService: UserService, private tostr: ToastrService) { }

  ngOnInit() {
    this.callApiToPrimaryAccount();
  }

  isAmountValid(): boolean {
    if (this.amount !== undefined && this.amount !== null) {
      return /^\d+$/.test(this.amount.toString());
    }
    return false;
  }

  callApiToPrimaryAccount(){
    let data = {
      user_id:localStorage.getItem('stateHandlerId')
    }
    this.userService.callApiToShoPrimaryAccount(data).subscribe({
      next:(res:any)=>{
        this.primaryAccount = res.primaryBank.bank_name;
      },
      error:(err)=>{
        console.log(err.error.message)
      }
    })
  }

  enterAmount(value:any){
   this.amount = value
  }

  requestWithdraw(){
    let data = {
      userId: localStorage.getItem('stateHandlerId'),
      amount: this.amount,
    paymentBy: this.primaryAccount
    }
    this.userService.shoWithdrawalRequest(data).subscribe({
      next:(res:any)=>{
        this.tostr.success(res.message)
      },
      error:(err=>{
        this.tostr.warning(err.error.message)
      })
    })
  }
}
