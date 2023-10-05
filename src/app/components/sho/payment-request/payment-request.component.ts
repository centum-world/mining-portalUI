import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { WithdrawDialogComponent } from '../diolog/withdraw-dialog/withdraw-dialog.component';

@Component({
  selector: 'app-payment-request',
  templateUrl: './payment-request.component.html',
  styleUrls: ['./payment-request.component.css']
})
export class PaymentRequestComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit() {
  }

  withdrawDiolog(){
    let config: MatDialogConfig = {
      panelClass: 'myStateWithdrawDialogClass',
    };
    const dialogRef = this.dialog.open(WithdrawDialogComponent, config);
   
  }

}
