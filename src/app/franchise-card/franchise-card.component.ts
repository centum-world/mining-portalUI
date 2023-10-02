import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FranchiseAddBankComponent } from '../components/modal/franchise-add-bank/franchise-add-bank.component';
import { FranchiseViewBankDetailsComponent } from '../components/modal/franchise-view-bank-details/franchise-view-bank-details.component';

@Component({
  selector: 'app-franchise-card',
  templateUrl: './franchise-card.component.html',
  styleUrls: ['./franchise-card.component.css']
})
export class FranchiseCardComponent implements OnInit {
  displayFranchiseId = localStorage.getItem('franchiseId');
  displayFranchiseReferralId = localStorage.getItem('franchiseReferralId')

  constructor(private userService:UserService,private dialog:MatDialog) { }

  ngOnInit() {
  }

  franchiseAddBankDialog(){

    let config:MatDialogConfig = {
      height:'70%',width:'60%', panelClass:'myStateDialogClass'
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
            let config:MatDialogConfig = {
              height:'70%',width:'60%', panelClass:'myStateDialogClass', data:response.result
            };
            const dialogRef = this.dialog.open(FranchiseViewBankDetailsComponent,config);
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
