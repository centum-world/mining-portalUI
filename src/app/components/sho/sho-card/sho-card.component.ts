import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StateAddBankComponent } from '../../modal/state-add-bank/state-add-bank.component';
import { UserService } from 'src/app/service/user.service';
import { StateViewBankDetailsComponent } from '../../modal/state-view-bank-details/state-view-bank-details.component';
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { StateEditBankComponent } from '../../modal/state-edit-bank/state-edit-bank.component';

@Component({
  selector: 'app-sho-card',
  templateUrl: './sho-card.component.html',
  styleUrls: ['./sho-card.component.css']
})
export class ShoCardComponent implements OnInit {
  todayFranchiseCount:number;
  totalFranchiseCount:number;
  totalMemberReferralCount: number;
  todayMemberReferralCount: number;
  totalPartnerCount: number;
  todayPartnerCount: number;


  usertype = localStorage.getItem('userType');
  totalWithdrawalOfState:any;
  totalWalletOfState:any;
  bankDetails=[];
  totalPayout:any;
  totalPayoutCurrentMonth:any;
  totalPayoutToday:any;
  displayStateHandlerId = localStorage.getItem('stateHandlerId');
  displayStateHandlerReferralId = localStorage.getItem('stateRefferalId')
  constructor(private dialog:MatDialog,private userService:UserService,
     private router:Router,
     private toastr:ToastrService
     ) { }

  ngOnInit() {
    this.callApiToFetchStateTotalWithdrawal()
    this.callApiToFetchStateTotalWallet()
    this.fetchTotalcountFranchiseMemberPartner()
    this.callApiTofetchTodaysAndTotal()
  };


 

  stateAddBankDialog(){

    let config:MatDialogConfig = {
       panelClass:'bmmAddBankDialogClass'
    };
    const dialogRef = this.dialog.open(StateAddBankComponent,config);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Do something with the result if needed
    });
  }

  stateEditBankDialog(){

    let config:MatDialogConfig = {
      panelClass:'bmmEditBankDialogClass'
   };
   const dialogRef = this.dialog.open(StateEditBankComponent,config);

   dialogRef.afterClosed().subscribe(result => {
     console.log('The dialog was closed');
     // Do something with the result if needed
   });

  }

  stateViewBankDetailsDialog() {
    let data = {
        userId: localStorage.getItem('stateHandlerId')
    };

    this.userService.fetchStateBankDetails(data).subscribe({
        next: (response: any) => {
            let config: MatDialogConfig;

            if (response && response.result) {
                console.log(response.result);
                config = {
                    panelClass: 'bmmViewBankDetailsDialogClass',
                    data: response.result
                };
            } else {
                config = {
                    panelClass: 'bmmViewBankDetailsDialogClass',
                    data: null // or any default value you want to pass when there's no data
                };
            }

            const dialogRef = this.dialog.open(StateViewBankDetailsComponent, config);

            dialogRef.afterClosed().subscribe(result => {
                console.log('The dialog was closed');
                // Do something with the result if needed
            });
        },
        error: error => {
            console.log(error);
        }
    });
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


  fetchTotalcountFranchiseMemberPartner() {
    
    let  referralId=localStorage.getItem('stateRefferalId')
  
    this.userService.fetchTotalcountFranchiseMemberPartner(referralId).subscribe({
      next: (result: any) => {
        // Process the result as needed
        console.log(result);
        this.totalMemberReferralCount = result.totalMemberReferralCount
        this.todayMemberReferralCount  = result.todayMemberReferralCount

        this.totalPartnerCount = result.totalPartnerCount
        this.todayPartnerCount = result.todayPartnerCount

        this.totalFranchiseCount = result.totalFranchiseCount
        this.todayFranchiseCount = result.todayFranchiseCount

        // this.totalMultipleRIGPartnerCount = result.totalMultipleRIGPartnerCount
        // this.todayMultipleRIGPartnerCount = result.todayMultipleRIGPartnerCount

        // console.log(  this.totalReferralCount , 318)
      },
      error: error => {
        console.log(error, "fetch count")
      }
    });
  }

  callApiTofetchTodaysAndTotal(){
    let currentdate = new Date();
    let year = currentdate.getFullYear().toString();
    let month = (currentdate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed, so add 1
    let day = currentdate.getDate().toString().padStart(2, "0");
    let formattedDate = `${year}-${month}-${day}`;

    let data = {
      userid: localStorage.getItem("stateHandlerId"),
      currentDate:formattedDate
    };
    this.userService.callApiToFetchTodaysAndTotalPayout(data).subscribe((response: any) => {
        if (response) {
          this.totalPayoutToday = response.data.totalAmountToday
          this.totalPayoutCurrentMonth = response.data.totalAmountCurrentMonth
          this.totalPayout = response.data.totalPayout
        }
      });
  }

  copyToClipboard() {
    const textToCopy = this.displayStateHandlerReferralId;
    const textarea = document.createElement('textarea');
    textarea.value = textToCopy;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    this.toastr.success('Referral ID copied to clipboard!', 'Success');
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
  // partnerMyTeam(){
  //   this.router.navigate(['/statedashboard/partner-list'])
  // }

  udgrade(){
    this.router.navigate(['/statedashboard/promotion'])
  }

  viewPartnerList(){
    this.router.navigate(['/statedashboard/partner-list'])
  }
  viewReferralList(){
    this.router.navigate(['/statedashboard/referral-list'])
  }
  viewFranchiseList(){
    this.router.navigate(['/statedashboard/franchise-list'])
  }
  viewReferralPayout(){
    this.router.navigate(['/statedashboard/referral-payout'])
  }

  shareFunction(){
    const displayMemberRefferalId = localStorage.getItem('stateRefferalId');
    const referralType = localStorage.getItem('userType');
    const message = `Check out this link: https://apps.centumworldrig.com/mininglogin and Referral type : ${referralType} , Referral ID : ${displayMemberRefferalId}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }
}
