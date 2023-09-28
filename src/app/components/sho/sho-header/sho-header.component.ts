import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StateProfileModalComponent } from '../../modal/state-profile-modal/state-profile-modal.component';
import { MatDialogConfig } from '@angular/material/dialog';
@Component({
  selector: 'app-sho-header',
  templateUrl: './sho-header.component.html',
  styleUrls: ['./sho-header.component.css']
})
export class ShoHeaderComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
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
