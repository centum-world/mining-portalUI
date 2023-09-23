import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StateProfileModalComponent } from '../modal/state-profile-modal/state-profile-modal.component';

@Component({
  selector: 'app-statedashboard',
  templateUrl: './statedashboard.component.html',
  styleUrls: ['./statedashboard.component.css']
})
export class StatedashboardComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  

  openDialog() {
    const dialogRef = this.dialog.open(StateProfileModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}




