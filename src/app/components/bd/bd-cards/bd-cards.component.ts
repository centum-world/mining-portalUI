import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { UserService } from 'src/app/service/user.service';
import { BusinessAddBankComponent } from '../modal/business-add-bank/business-add-bank.component';
import { BusinessViewBankComponent } from '../modal/business-view-bank/business-view-bank.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bd-cards',
  templateUrl: './bd-cards.component.html',
  styleUrls: ['./bd-cards.component.css']
})
export class BdCardsComponent implements OnInit {

  bankDetails=[];
  displayBusinessHandlerId = localStorage.getItem('bdHandlerID');
  displayBusinessHandlerReferralId = localStorage.getItem('bdRefferalId')

  constructor(private dialog:MatDialog,private userService:UserService,
    private router:Router) { }

  ngOnInit() {
  }

  businessWithdrawalRequestViewList(){
    this.router.navigate(['/bd-dashboard/withdrawal-request-history'])
  }

  businessAddBankDialog(){

    let config:MatDialogConfig = {
       panelClass:'businessAddBankDialogClass'
    };
    const dialogRef = this.dialog.open(BusinessAddBankComponent,config);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Do something with the result if needed
    });
  }

  stateViewBankDetailsDialog(){

    let data = {
      userId :localStorage.getItem('bdHandlerID')
     }
     this.userService.fetchStateBankDetails(data).subscribe({
      next: (response: any) => {
        if (response) {
            console.log(response.result)
            let config:MatDialogConfig = {
            panelClass:'stateViewBankDetailsDialogClass', data:response.result
            };
            const dialogRef = this.dialog.open(BusinessViewBankComponent,config);
            dialogRef.afterClosed().subscribe(result => {
              console.log('The dialog was closed');
              // Do something with the result if needed
            })
        }
      },
      error: error => {
       console.log(error)
      }
    })
    
  }

}
