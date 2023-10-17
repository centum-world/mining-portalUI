import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { UserService } from 'src/app/service/user.service';
import { BusinessAddBankComponent } from '../modal/business-add-bank/business-add-bank.component';
import { BusinessViewBankComponent } from '../modal/business-view-bank/business-view-bank.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bd-cards',
  templateUrl: './bd-cards.component.html',
  styleUrls: ['./bd-cards.component.css']
})
export class BdCardsComponent implements OnInit {

  totalWithdrawalOfBusinessDev: any;

  bankDetails = [];
  displayBusinessHandlerId = localStorage.getItem('bdHandlerID');
  displayBusinessHandlerReferralId = localStorage.getItem('bdRefferalId')

  constructor(private dialog: MatDialog, private userService: UserService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.totalWithdrawalAmount();
  }

  businessWithdrawalRequestViewList() {
    this.router.navigate(['/bd-dashboard/withdrawal-request-history'])
  }

  businessWithdrawalSuccessViewList() {
    this.router.navigate(['/bd-dashboard/withdrawal-success-history'])
  }

  businessPartnerMyTeamViewList() {
    this.router.navigate(['/bd-dashboard/businessDev-partner-team'])
  }

  businessAddBankDialog() {

    let config: MatDialogConfig = {
      panelClass: 'businessAddBankDialogClass'
    };
    const dialogRef = this.dialog.open(BusinessAddBankComponent, config);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Do something with the result if needed
    });
  }

  stateViewBankDetailsDialog() {

    let data = {
      userId: localStorage.getItem('bdHandlerID')
    }
    this.userService.fetchStateBankDetails(data).subscribe({
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
    let config: MatDialogConfig = {
      panelClass: 'stateViewBankDetailsDialogClass', data: this.bankDetails
    };
    const dialogRef = this.dialog.open(BusinessViewBankComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Do something with the result if needed
    })

  }

  totalWithdrawalAmount() {
    let data = {
      userId: localStorage.getItem('bdHandlerID')
    }
    this.userService.fetchBusinessDevTotalWithdrawal(data).subscribe({
      next: (result: any) => {
        if (result) {
          console.log(typeof (result.data))

          this.totalWithdrawalOfBusinessDev = result.data || 0;
        }

      },
      error: error => {
        this.toastr.error('Something went wrong', 'Error');
      }
    })
  }



}
