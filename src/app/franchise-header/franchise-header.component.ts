import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FranchiseProfileDetailsComponent } from '../franchise-profile-details/franchise-profile-details.component';
import { MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: "app-franchise-header",
  templateUrl: "./franchise-header.component.html",
  styleUrls: ["./franchise-header.component.css"],
})
export class FranchiseHeaderComponent implements OnInit {
  constructor(private dialog: MatDialog) { }

  ngOnInit() {}

  
  openDialog() {
    let config: MatDialogConfig = {
      height:'70%', width:'60%', panelClass:'myStateDialogClass'
    };
    const dialogRef = this.dialog.open(FranchiseProfileDetailsComponent,config);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Do something with the result if needed
    });
  }

}
