import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FranchiseAddBankComponent } from '../components/modal/franchise-add-bank/franchise-add-bank.component';
import { FranchiseViewBankDetailsComponent } from '../components/modal/franchise-view-bank-details/franchise-view-bank-details.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-franchise-card',
  templateUrl: './franchise-card.component.html',
  styleUrls: ['./franchise-card.component.css']
})
export class FranchiseCardComponent implements OnInit {

  totalWithdrawalOfFranchise :any;
  totalWalletOfFranchise:any;
  bankDetails = [];
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

  udgrade(){
    this.router.navigate(['/franchisedashboard/promotion'])
  }

  shareFunction(){
    const displayMemberRefferalId = localStorage.getItem('franchiseRefferalId');
    const referralType = localStorage.getItem('userType');
    const message = `Check out this link: https://apps.centumworldrig.com/mininglogin and Referral type : ${referralType} , Referral ID : ${displayMemberRefferalId}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

}
