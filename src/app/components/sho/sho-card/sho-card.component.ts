import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { StateAddBankComponent } from '../../modal/state-add-bank/state-add-bank.component';
import { UserService } from 'src/app/service/user.service';
import { StateViewBankDetailsComponent } from '../../modal/state-view-bank-details/state-view-bank-details.component';


@Component({
  selector: 'app-sho-card',
  templateUrl: './sho-card.component.html',
  styleUrls: ['./sho-card.component.css']
})
export class ShoCardComponent implements OnInit {

  bankDetails=[];
  displayStateHandlerId = localStorage.getItem('stateHandlerId');
  displayStateHandlerReferralId = localStorage.getItem('stateRefferalId')
  constructor(private dialog:MatDialog,private userService:UserService) { }

  ngOnInit() {
  }

  stateAddBankDialog(){

    let config:MatDialogConfig = {
      height:'70%',width:'60%', panelClass:'myStateDialogClass'
    };
    const dialogRef = this.dialog.open(StateAddBankComponent,config);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Do something with the result if needed
    });
  }

  stateViewBankDetailsDialog(){

    let data = {
      userId :localStorage.getItem('stateHandlerId')
     }
     this.userService.fetchStateBankDetails(data).subscribe({
      next: (response: any) => {
        if (response) {
            console.log(response.result)
            let config:MatDialogConfig = {
              height:'70%',width:'60%', panelClass:'myStateDialogClass', data:response.result
            };
            const dialogRef = this.dialog.open(StateViewBankDetailsComponent,config);
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
