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
  myWallet:0;
  constructor(private userService: UserService, private tostr: ToastrService) { }

  ngOnInit() {
    this.callApiToPrimaryAccount();
    this.callApiToMyDetails();
  }

  isAmountValid(): boolean {
    if (this.amount !== undefined && this.amount !== null) {
      return /^\d+$/.test(this.amount.toString());
    }
    return false;
  }

  callApiToPrimaryAccount(){
    const stateHandlerId =  localStorage.getItem('stateHandlerId')
    const franchiseId = localStorage.getItem('franchiseId');
    const memberID = localStorage.getItem('userdetail');
    if(stateHandlerId){
      let data = {
        user_id:stateHandlerId
      }
      this.userService.callApiToShoPrimaryAccount(data).subscribe({
        next:(res:any)=>{
          this.primaryAccount = res.primaryBank.bank_name;
        },
        error:(err)=>{
          console.log(err.error.message)
        }
      })
    }else if(franchiseId){
      let data = {
        user_id:franchiseId
      }
      this.userService.callApiToShoPrimaryAccount(data).subscribe({
        next:(res:any)=>{
          this.primaryAccount = res.primaryBank.bank_name;
        },
        error:(err)=>{
          console.log(err.error.message)
        }
      })
    }else if(memberID){
      let data = {
        user_id:memberID
      }
      this.userService.callApiToShoPrimaryAccount(data).subscribe({
        next:(res:any)=>{
          this.primaryAccount = res.primaryBank.bank_name;
          console.log(this.primaryAccount)
        },
        error:(err)=>{
          console.log(err.error.message)
        }
      })
    }
  }

  enterAmount(value:any){
   this.amount = value
  }

  requestWithdraw(){

    const stateHandlerId = localStorage.getItem('stateHandlerId')
    const franchiseId = localStorage.getItem("franchiseId");
    const memberId = localStorage.getItem('userdetail');

    if(stateHandlerId){
      let data = {
        userId: stateHandlerId,
        amount: this.amount,
      paymentBy: this.primaryAccount
      }
      this.userService.shoWithdrawalRequest(data).subscribe({
        next:(res:any)=>{
          this.tostr.success(res.message)
          this.callApiToMyDetails()
        },
        error:(err=>{
          this.tostr.warning(err.error.message)
        })
      })
    }else if(franchiseId){
      let data = {
        userId: franchiseId,
        amount: this.amount,
        paymentBy: this.primaryAccount
      }
      this.userService.franchiseWithdrawalRequest(data).subscribe({
        next:(res:any)=>{
          this.tostr.success(res.message)
          this.callApiToMyDetails()
        },
        error:(err=>{
          this.tostr.warning(err.error.message)
        })
      })
    }else if(memberId){
      let data = {
        memberId: memberId,
        amount: this.amount,
        bank: this.primaryAccount
      }
      this.userService.createRequsetWithdrawal(data).subscribe({
        next:(res:any)=>{
          this.tostr.success(res.message)
          this.callApiToMyDetails()
        },
        error:(err=>{
          this.tostr.warning(err.error.message)
        })
      })
    }
  }

  callApiToMyDetails(){
    const stateHandlerId = localStorage.getItem('stateHandlerId');
    const franchiseId = localStorage.getItem("franchiseId");
    const memberId = localStorage.getItem('userdetail');
    if(stateHandlerId){
      let data = {
        stateHandlerId : stateHandlerId
      }
      this.userService.shoDetails(data).subscribe({
        next:(res:any)=>{
          console.log(res.sho.stateHandlerWallet)
          this.myWallet = res.sho.stateHandlerWallet
        },
        error:(err=>{
          console.log(err.error.message)
        })
      })
    }else if(franchiseId){
      let data = {
        franchiseId : franchiseId
      }
      this.userService.fetchParticularFranchiseDetails(data).subscribe({
        next:(res:any)=>{
          console.log(res)
          this.myWallet = res.franchise.franchiseWallet;
        },
        error:(err=>{
          console.log(err.error.message)
        })
      })
    }else if(memberId){
      let data = {
        m_userid : memberId
      }
      this.userService.fetchMemberPortalDetails(data).subscribe({
        next:(res:any)=>{
          console.log(res.data[0].member_wallet)
          this.myWallet = res.data[0].member_wallet;
        },
        error:(err=>{
          console.log(err.error.message)
        })
      })
    }
  }
}
