import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmApprovedComponent } from '../dialog/confirm-approved/confirm-approved.component';
import { MatDialog } from '@angular/material';
import { MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-bd-account',
  templateUrl: './bd-account.component.html',
  styleUrls: ['./bd-account.component.css']
})
export class BdAccountComponent implements OnInit {
  bdID: string;
  constructor(private route: ActivatedRoute, private dialog: MatDialog) { 
    this.route.params.subscribe(params => {
      this.bdID = params['id']; // Retrieve parameter 1
      console.log(this.bdID);
    });
  }

  ngOnInit() {
  }


  bdApproved(){
    let config: MatDialogConfig = {
      panelClass: 'requsetApprovedDialogClass'
   };
   const dialogRef = this.dialog.open(ConfirmApprovedComponent, config);

     dialogRef.componentInstance.okClicked.subscribe(() => {
      console.log('hiiiiiiiiiiiii')
   })

   dialogRef.afterClosed().subscribe(result => {
     console.log("Closed");
   });
  }
}
