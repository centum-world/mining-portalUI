import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StateProfileModalComponent } from '../modal/state-profile-modal/state-profile-modal.component';
import { MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-statedashboard',
  templateUrl: './statedashboard.component.html',
  styleUrls: ['./statedashboard.component.css']
})
export class StatedashboardComponent implements OnInit {

  displayStateHandlerId:any;
  displayStateRefferalId:any;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
   this.displayStateHandlerId = localStorage.getItem('stateHandlerId')
   this.displayStateRefferalId = localStorage.getItem('stateRefferalId')
  }

  

  openDialog() {
    let config: MatDialogConfig = {
      height:'70%', width:'60%', panelClass:'myStateDialogClass'
    };
    const dialogRef = this.dialog.open(StateProfileModalComponent,config);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Do something with the result if needed
    });
  }
  
}




