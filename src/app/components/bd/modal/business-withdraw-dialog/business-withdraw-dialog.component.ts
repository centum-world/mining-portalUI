import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-business-withdraw-dialog',
  templateUrl: './business-withdraw-dialog.component.html',
  styleUrls: ['./business-withdraw-dialog.component.css']
})
export class BusinessWithdrawDialogComponent implements OnInit {

  amount: number;
  primaryAccount = "";
  myWallet: any;
  constructor(private userService: UserService, private tostr: ToastrService) { }

  ngOnInit() {
    this.callApiToPrimaryAccount();
    this.calApiTofetchBusinessWallet();
  }

  isAmountValid(): boolean {
    if (this.amount !== undefined && this.amount !== null) {
      return /^\d+$/.test(this.amount.toString());
    }
    return false;
  }

  callApiToPrimaryAccount() {
    const stateHandlerId = localStorage.getItem('stateHandlerId')
    const franchiseId = localStorage.getItem('franchiseId');
    const businessId = localStorage.getItem("bdHandlerID");
    if (stateHandlerId) {
      let data = {
        user_id: stateHandlerId
      }
      this.userService.callApiToShoPrimaryAccount(data).subscribe({
        next: (res: any) => {
          this.primaryAccount = res.primaryBank.bank_name;
        },
        error: (err) => {
          console.log(err.error.message)
        }
      })
    } else if (franchiseId) {
      let data = {
        user_id: franchiseId
      }
      this.userService.callApiToShoPrimaryAccount(data).subscribe({
        next: (res: any) => {
          this.primaryAccount = res.primaryBank.bank_name;
        },
        error: (err) => {
          console.log(err.error.message)
        }
      })
    } else if (businessId) {
      let data = {
        user_id: businessId
      }
      this.userService.callApiToShoPrimaryAccount(data).subscribe({
        next: (res: any) => {
          this.primaryAccount = res.primaryBank.bank_name;
        },
        error: (err) => {
          console.log(err.error.message)
        }
      })
    }
  }

  enterAmount(value: any) {
    this.amount = value
  }

  requestWithdraw() {

    const stateHandlerId = localStorage.getItem('stateHandlerId')
    const franchiseId = localStorage.getItem("franchiseId");
    const businessId = localStorage.getItem("bdHandlerID");
    if (stateHandlerId) {
      let data = {
        userId: stateHandlerId,
        amount: this.amount,
        paymentBy: this.primaryAccount
      }
      this.userService.shoWithdrawalRequest(data).subscribe({
        next: (res: any) => {
          this.tostr.success(res.message)
          
        },
        error: (err => {
          this.tostr.warning(err.error.message)
        })
      })
    } else if (franchiseId) {
      let data = {
        userId: franchiseId,
        amount: this.amount,
        paymentBy: this.primaryAccount
      }
      this.userService.franchiseWithdrawalRequest(data).subscribe({
        next: (res: any) => {
          this.tostr.success(res.message)
        },
        error: (err => {
          this.tostr.warning(err.error.message)
        })
      })
    } else if (businessId) {
      let data = {
        userId: businessId,
        amount: this.amount,
        paymentBy: this.primaryAccount
      }
      this.userService.BusinessWithdrawalRequest(data).subscribe({
        next: (res: any) => {
          this.tostr.success(res.message)
          this.calApiTofetchBusinessWallet()
        },
        error: (err => {
          this.tostr.warning(err.error.message)
        })
      })
    }
  }

  calApiTofetchBusinessWallet() { 
    
      let data = {
        businessDeveloperId: localStorage.getItem('bdHandlerID')
      }
      this.userService.fetchParticularBdDetails(data).subscribe({
        next: (res: any) => {
          console.log(res.bdDetails.bdWallet)
          this.myWallet = res.bdDetails.bdWallet
        },
        error: (err => {
          console.log(err.error.message)
        })
      })
    

  }
}
