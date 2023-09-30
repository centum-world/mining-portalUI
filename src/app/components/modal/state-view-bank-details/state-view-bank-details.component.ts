import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

interface BankDetails{
  holder_name:string;
  account_no:string;
  branch_name:string;
  ifsc_code:string;
  bank_name:string;
}
@Component({
  selector: 'app-state-view-bank-details',
  templateUrl: './state-view-bank-details.component.html',
  styleUrls: ['./state-view-bank-details.component.css']
})
export class StateViewBankDetailsComponent implements OnInit {

  dataSource: MatTableDataSource<BankDetails>;
  displayStateHandlerId = localStorage.getItem('stateHandlerId')
  displayedColumns: string[] = ['holder_name', 'bank_name', 'branch_name', 'account_no', 'ifsc_code'];

  constructor(private userService:UserService, @Inject(MAT_DIALOG_DATA) public data:any) {

    this.dataSource = new MatTableDataSource([]);
    this.dataSource.data = data
   }

  ngOnInit() {
  }

  callApiToShowStateBankDetails() {
   
   }
}
