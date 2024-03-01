import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FranchiseAddBankComponent } from '../components/modal/franchise-add-bank/franchise-add-bank.component';
import { FranchiseViewBankDetailsComponent } from '../components/modal/franchise-view-bank-details/franchise-view-bank-details.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FranchiseEditBankComponent } from '../components/modal/franchise-edit-bank/franchise-edit-bank.component';


@Component({
  selector: 'app-franchise-card',
  templateUrl: './franchise-card.component.html',
  styleUrls: ['./franchise-card.component.css']
})
export class FranchiseCardComponent implements OnInit {

  totalMemberReferralCount:number;
  todayMemberReferralCount:number;
  totalPartnerCount: number;
  todayPartnerCount: number;

  totalWithdrawalOfFranchise :any;
  totalWalletOfFranchise:any;
  bankDetails = [];
  totalPayout:any;
  totalPayoutCurrentMonth :any;
  totalPayoutToday:any;
  displayFranchiseId = localStorage.getItem('franchiseId');
  displayFranchiseReferralId = localStorage.getItem('franchiseRefferalId')
  usertype = localStorage.getItem('userType');

  constructor(private userService:UserService,private dialog:MatDialog,
    private toastr :ToastrService,
    private router:Router
    ) { }

  ngOnInit() {
    this.callApiTOFetchTotalWithdrawal()
    this.callApiTOFetchTotalWiallet()
    this.fetchTotalCountMemberPartner()
    this.callApiTofetchTodaysAndTotal()
  }
  
  franchiseWithdrawalRequestViewList() {
    this.router.navigate(['/franchisedashboard/withdrawal-request-history'])
  }

  franchiseWithdrawalSuccessViewList(){
    this.router.navigate(['/franchisedashboard/withdrawal-history'])
  }

  franchisePartnerMyTeamViewList(){
    this.router.navigate(['/franchisedashboard/partner-my-team'])
  }
  franchiseAddBankDialog(){

    let config:MatDialogConfig = {
       panelClass:'franchiseAddBankDialogClass'
    };
    const dialogRef = this.dialog.open(FranchiseAddBankComponent,config);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Do something with the result if needed
    });

  }

  franchiseEditBankDialog(){
   let config:MatDialogConfig = {
       panelClass:'franchiseEditBankDialogClass'
    };
    const dialogRef = this.dialog.open(FranchiseEditBankComponent,config);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Do something with the result if needed
    });

  }

  franchiseViewBankDetailsDialog(){

    let data = {
      franchiseId :localStorage.getItem('franchiseId')
     }
     this.userService.fetchFranchiseBankDetails(data).subscribe({
      next: (response: any) => {
        if (response) {
            console.log(response.result)
            this.bankDetails = response.result;
            
        }
      },
      error: error => {
       console.log(error)
      }
    })
    let config:MatDialogConfig = {
      panelClass:'franchiseViewBankDetailsDialogClass', data:this.bankDetails
     };
     const dialogRef = this.dialog.open(FranchiseViewBankDetailsComponent,config);
     dialogRef.afterClosed().subscribe(result => {
       console.log('The dialog was closed');
       // Do something with the result if needed
     })
  }

  callApiTOFetchTotalWithdrawal(){
    let data = {
      userId:localStorage.getItem('franchiseId')
    }
    this.userService.fetchFranchiseTotalWithdrawal(data).subscribe({
      next: (result: any) => {
        if (result) {
           console.log(result)

          this.totalWithdrawalOfFranchise = result.data || 0;
        }

      },
      error: error => {
        this.toastr.error('Something went wrong', 'Error');
      }
    })
  }


  fetchTotalCountMemberPartner() {
    
    let  referralId= this.displayFranchiseReferralId
  
    this.userService.fetchedTotalCountMemberPartner(referralId).subscribe({
      next: (result: any) => {
        // Process the result as needed
        console.log(result);
        this.totalMemberReferralCount = result.totalMemberReferralCount
        this.todayMemberReferralCount  = result.todayMemberReferralCount

        this.totalPartnerCount = result.totalPartnerCount
        this.todayPartnerCount = result.todayPartnerCount
      
      },
      error: error => {
        // this.toastr.error('Failed to fetch referral counts in franchise', 'Error');
        console.log(error)
      }
    });
  }



  copyToClipboard() {
    const textToCopy = this.displayFranchiseReferralId;
    const textarea = document.createElement('textarea');
    textarea.value = textToCopy;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    this.toastr.success('Referral ID copied to clipboard!', 'Success');
  }


  callApiTOFetchTotalWiallet(){
    let data = {
      franchiseId:localStorage.getItem('franchiseId')
    }
    this.userService.fetchParticularFranchiseDetails(data).subscribe({
      next: (result: any) => {
        if (result) {
          //  console.log(result.franchise.franchiseWallet)

           this.totalWalletOfFranchise = result.franchise.franchiseWallet || 0;
        }

      },
      error: error => {
        this.toastr.error('Something went wrong', 'Error');
      }
    })
  }

  callApiTofetchTodaysAndTotal(){
    let currentdate = new Date();
    let year = currentdate.getFullYear().toString();
    let month = (currentdate.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed, so add 1
    let day = currentdate.getDate().toString().padStart(2, "0");
    let formattedDate = `${year}-${month}-${day}`;

    let data = {
      userid: localStorage.getItem("franchiseId"),
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

  udgrade(){
    this.router.navigate(['/franchisedashboard/promotion'])
  }
  viewPartnerList(){
    this.router.navigate(['/franchisedashboard/partner-list'])
  }
  viewReferralList(){
    this.router.navigate(['/franchisedashboard/member-list'])
  }
  viewReferralPayout(){
    this.router.navigate(['/franchisedashboard/referral-payout'])
  }

  shareFunction(){
    const displayMemberRefferalId = localStorage.getItem('franchiseRefferalId');
    const referralType = localStorage.getItem('userType');
    const message = `Check out this link: https://apps.centumworldrig.com/mininglogin and Referral type : ${referralType} , Referral ID : ${displayMemberRefferalId}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

}
