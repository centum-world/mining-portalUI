import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-state-profile-modal',
  templateUrl: './state-profile-modal.component.html',
  styleUrls: ['./state-profile-modal.component.css'],
  
})
export class StateProfileModalComponent implements OnInit {

  // constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  //   public dialogRef: MatDialogRef<StateProfileModalComponent>) { }

  ngOnInit() {
  }


  // closeModal(): void {
  //   this.dialogRef.close();
  // }

}
