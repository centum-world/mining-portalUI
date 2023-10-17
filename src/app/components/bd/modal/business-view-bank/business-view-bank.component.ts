import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

interface BankDetails {
  holder_name: string;
  account_no: string;
  branch_name: string;
  ifsc_code: string;
  bank_name: string;
}

@Component({
  selector: 'app-business-view-bank',
  templateUrl: './business-view-bank.component.html',
  styleUrls: ['./business-view-bank.component.css']
})

export class BusinessViewBankComponent implements OnInit {
  bankDetails: BankDetails[] = [];
  selectedBank = {
    bankName: null
  };
  businessID = localStorage.getItem("bdHandlerID");
  dataSource: MatTableDataSource<BankDetails>;
  displayStateHandlerId = localStorage.getItem('bdHandlerID');
  displayedColumns: string[] = ['holder_name', 'bank_name', 'branch_name', 'account_no', 'ifsc_code'];
  noBankDetailsFound = false;

  constructor(private userService: UserService, private toastr: ToastrService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dataSource = new MatTableDataSource([]);
    if (data && data.length > 0) {
      this.dataSource.data = data;
      this.bankDetails = data;
      for (const entry of data) {
        if (entry.isPrimary === 1) {
          this.selectedBank.bankName = entry.bank_name;
          this.businessID = entry.user_id;
        }
      }
    } else {
      this.noBankDetailsFound = true;
    }
  }

  onRadioChange() {
    if (!this.selectedBank.bankName) {
      return;
    }
    let data = {
      user_id: this.businessID,
      bank_name: this.selectedBank.bankName
    };

    this.userService.businessChangePrimaryBank(data).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message);
      },
      error: (err) => {
        this.toastr.warning(err.error.message);
      }
    });
  }

  ngOnInit() {
  }
}
